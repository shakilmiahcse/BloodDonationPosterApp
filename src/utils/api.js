// Client-side API layer for authentication and multi-user record storage
const API_BASE = window.location.pathname.includes('/dist/') 
  ? '../api.php' 
  : (window.location.port === '5173' ? '/api.php' : 'api.php');

const TOKEN_KEY = 'blood_auth_token';
const USER_KEY = 'blood_auth_user';

export const api = {
  // Check auth state
  async checkAuth() {
    try {
      const token = localStorage.getItem(TOKEN_KEY);
      const res = await fetch(`${API_BASE}?action=check_auth`, {
        headers: token ? { 'Authorization': `Bearer ${token}` } : {}
      });
      if (res.ok) {
        const data = await res.json();
        if (data.authenticated && data.user) {
          localStorage.setItem(USER_KEY, JSON.stringify(data.user));
          return { authenticated: true, user: data.user };
        }
      }
    } catch (e) {
      console.warn('API server unreachable, fallback to stored session:', e);
    }
    const saved = localStorage.getItem(USER_KEY);
    if (saved) {
      try {
        return { authenticated: true, user: JSON.parse(saved) };
      } catch (err) {}
    }
    return { authenticated: false, user: null };
  },

  // Register
  async register(registrationData) {
    try {
      const res = await fetch(`${API_BASE}?action=register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(registrationData)
      });
      const data = await res.json();
      if (res.ok && data.success) {
        if (data.token) localStorage.setItem(TOKEN_KEY, data.token);
        if (data.user) localStorage.setItem(USER_KEY, JSON.stringify(data.user));
        return { success: true, user: data.user, message: data.message };
      } else {
        return { success: false, message: data.message || 'Registration failed.' };
      }
    } catch (e) {
      // Offline fallback registration
      const user = {
        id: 'usr_' + Date.now(),
        name: registrationData.name,
        username: registrationData.username,
        orgSettings: {
          orgName: registrationData.orgName || '',
          orgSubtitle: registrationData.orgSubtitle || '',
          templateId: registrationData.templateId || 'bancharampur-classic'
        }
      };
      localStorage.setItem(TOKEN_KEY, 'offline_token_' + user.id);
      localStorage.setItem(USER_KEY, JSON.stringify(user));
      return { success: true, user, message: 'Account created successfully!' };
    }
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
        if (data.token) localStorage.setItem(TOKEN_KEY, data.token);
        if (data.user) localStorage.setItem(USER_KEY, JSON.stringify(data.user));
        return { success: true, user: data.user, message: data.message };
      } else {
        return { success: false, message: data.message || 'Invalid username or password.' };
      }
    } catch (e) {
      // Check stored user if offline
      const stored = localStorage.getItem(USER_KEY);
      if (stored) {
        const u = JSON.parse(stored);
        if (u.username === username.toLowerCase()) {
          return { success: true, user: u, message: 'Login successful (offline session).' };
        }
      }
      return { success: false, message: 'Invalid username or password. Please register first.' };
    }
  },

  // Logout
  async logout() {
    try {
      const token = localStorage.getItem(TOKEN_KEY);
      await fetch(`${API_BASE}?action=logout`, {
        method: 'POST',
        headers: token ? { 'Authorization': `Bearer ${token}` } : {}
      });
    } catch (e) {}
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    return { success: true };
  },

  // Save organization default settings
  async saveSettings(settings) {
    try {
      const token = localStorage.getItem(TOKEN_KEY);
      const res = await fetch(`${API_BASE}?action=save_settings`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { 'Authorization': `Bearer ${token}` } : {})
        },
        body: JSON.stringify(settings)
      });
      const data = await res.json();
      if (res.ok && data.success) {
        const current = JSON.parse(localStorage.getItem(USER_KEY) || '{}');
        current.orgSettings = data.orgSettings;
        localStorage.setItem(USER_KEY, JSON.stringify(current));
        return { success: true, orgSettings: data.orgSettings };
      }
    } catch (e) {
      const current = JSON.parse(localStorage.getItem(USER_KEY) || '{}');
      current.orgSettings = settings;
      localStorage.setItem(USER_KEY, JSON.stringify(current));
      return { success: true, orgSettings: settings };
    }
  },

  // Get records for current user
  async getRecords() {
    try {
      const token = localStorage.getItem(TOKEN_KEY);
      const res = await fetch(`${API_BASE}?action=get_records`, {
        headers: token ? { 'Authorization': `Bearer ${token}` } : {}
      });
      if (res.ok) {
        const data = await res.json();
        return data.records || [];
      }
    } catch (e) {
      console.warn('API getRecords error, fallback:', e);
    }
    const user = JSON.parse(localStorage.getItem(USER_KEY) || '{}');
    const local = localStorage.getItem(`donor_records_${user.id || 'guest'}`);
    return local ? JSON.parse(local) : [];
  },

  // Save record
  async saveRecord(recordData) {
    try {
      const token = localStorage.getItem(TOKEN_KEY);
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
        return { success: true, record: data.record, message: data.message };
      } else {
        return { success: false, message: data.message || 'Failed to save record.' };
      }
    } catch (e) {
      // Local fallback for offline
      const user = JSON.parse(localStorage.getItem(USER_KEY) || '{}');
      const storageKey = `donor_records_${user.id || 'guest'}`;
      let list = JSON.parse(localStorage.getItem(storageKey) || '[]');
      const id = recordData.id || ('rec_' + Date.now());
      const rec = { ...recordData, id, userId: user.id, createdAt: new Date().toISOString() };
      const idx = list.findIndex(r => r.id === id);
      if (idx >= 0) list[idx] = rec;
      else list.unshift(rec);
      localStorage.setItem(storageKey, JSON.stringify(list));
      return { success: true, record: rec, message: 'Record saved to your account.' };
    }
  },

  // Delete record
  async deleteRecord(id) {
    try {
      const token = localStorage.getItem(TOKEN_KEY);
      await fetch(`${API_BASE}?action=delete_record&id=${encodeURIComponent(id)}`, {
        method: 'DELETE',
        headers: token ? { 'Authorization': `Bearer ${token}` } : {}
      });
    } catch (e) {}
    const user = JSON.parse(localStorage.getItem(USER_KEY) || '{}');
    const storageKey = `donor_records_${user.id || 'guest'}`;
    let list = JSON.parse(localStorage.getItem(storageKey) || '[]');
    list = list.filter(r => r.id !== id);
    localStorage.setItem(storageKey, JSON.stringify(list));
    return { success: true };
  }
};
