// Client-side API layer for authentication and record storage
const API_BASE = window.location.pathname.includes('/dist/') 
  ? '../api.php' 
  : (window.location.port === '5173' ? '/api.php' : 'api.php');

const AUTH_STORAGE_KEY = 'blood_auth_state';
const LOCAL_RECORDS_KEY = 'blood_donation_local_records';

export const api = {
  // Check auth state
  async checkAuth() {
    try {
      const token = localStorage.getItem('blood_token');
      const res = await fetch(`${API_BASE}?action=check_auth`, {
        headers: token ? { 'Authorization': `Bearer ${token}` } : {}
      });
      if (res.ok) {
        const data = await res.json();
        return {
          authenticated: !!data.authenticated,
          user: data.user
        };
      }
    } catch (e) {
      console.warn('Backend API not reachable, checking localStorage fallback:', e);
    }
    // Fallback
    const saved = localStorage.getItem(AUTH_STORAGE_KEY);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (err) {}
    }
    return { authenticated: false, user: null };
  },

  // Login
  async login(username, password) {
    try {
      const res = await fetch(`${API_BASE}?action=login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      const data = await res.json();
      if (res.ok && data.success) {
        localStorage.setItem('blood_token', data.token || 'blood_token_authenticated');
        localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify({ authenticated: true, user: data.user }));
        return { success: true, user: data.user, message: data.message };
      } else {
        return { success: false, message: data.message || 'ভুল ইউজারনেম বা পাসওয়ার্ড!' };
      }
    } catch (e) {
      console.warn('Using client-side fallback login for demo/offline:', e);
      // Demo login fallback if server isn't running php
      if (username === 'admin' && (password === 'blood1234' || password === 'admin')) {
        const user = { username: 'admin', name: 'অ্যাডমিন (ব্লাড ব্যাংক)' };
        localStorage.setItem('blood_token', 'blood_token_authenticated');
        localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify({ authenticated: true, user }));
        return { success: true, user, message: 'লগইন সফল হয়েছে (অফলাইন মোড)!' };
      }
      return { success: false, message: 'ভুল ইউজারনেম বা পাসওয়ার্ড! (ইউজারনেম: admin, পাসওয়ার্ড: blood1234)' };
    }
  },

  // Logout
  async logout() {
    try {
      await fetch(`${API_BASE}?action=logout`, { method: 'POST' });
    } catch (e) {}
    localStorage.removeItem('blood_token');
    localStorage.removeItem(AUTH_STORAGE_KEY);
    return { success: true };
  },

  // Get records
  async getRecords() {
    try {
      const token = localStorage.getItem('blood_token');
      const res = await fetch(`${API_BASE}?action=get_records`, {
        headers: token ? { 'Authorization': `Bearer ${token}` } : {}
      });
      if (res.ok) {
        const data = await res.json();
        return data.records || [];
      }
    } catch (e) {
      console.warn('Using local records fallback:', e);
    }
    const local = localStorage.getItem(LOCAL_RECORDS_KEY);
    return local ? JSON.parse(local) : [];
  },

  // Save record
  async saveRecord(recordData) {
    try {
      const token = localStorage.getItem('blood_token');
      const res = await fetch(`${API_BASE}?action=save_record`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { 'Authorization': `Bearer ${token}` } : {})
        },
        body: JSON.stringify(recordData)
      });
      const data = await res.json();
      if (res.ok && data.success) {
        // also sync with local storage
        this.saveToLocalStorage(data.record || recordData);
        return { success: true, record: data.record, message: data.message };
      } else {
        return { success: false, message: data.message || 'সেভ করা সম্ভব হয়নি।' };
      }
    } catch (e) {
      console.warn('Backend not responding, saving to localStorage:', e);
      const saved = this.saveToLocalStorage(recordData);
      return { success: true, record: saved, message: 'রেকর্ড সফলভাবে সেভ হয়েছে (লোকাল স্টোরেজ)!' };
    }
  },

  // Delete record
  async deleteRecord(id) {
    try {
      const token = localStorage.getItem('blood_token');
      const res = await fetch(`${API_BASE}?action=delete_record&id=${encodeURIComponent(id)}`, {
        method: 'DELETE',
        headers: token ? { 'Authorization': `Bearer ${token}` } : {}
      });
      if (res.ok) {
        this.deleteFromLocalStorage(id);
        return { success: true };
      }
    } catch (e) {}
    this.deleteFromLocalStorage(id);
    return { success: true };
  },

  saveToLocalStorage(record) {
    const list = this.getRecordsFromLocalStorage();
    const id = record.id || ('rec_' + Date.now());
    const full = { ...record, id, createdAt: record.createdAt || new Date().toISOString() };
    const idx = list.findIndex(r => r.id === id);
    if (idx >= 0) {
      list[idx] = full;
    } else {
      list.unshift(full);
    }
    localStorage.setItem(LOCAL_RECORDS_KEY, JSON.stringify(list));
    return full;
  },

  deleteFromLocalStorage(id) {
    let list = this.getRecordsFromLocalStorage();
    list = list.filter(r => r.id !== id);
    localStorage.setItem(LOCAL_RECORDS_KEY, JSON.stringify(list));
  },

  getRecordsFromLocalStorage() {
    const local = localStorage.getItem(LOCAL_RECORDS_KEY);
    return local ? JSON.parse(local) : [];
  }
};
