<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, DELETE");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

header("Content-Type: application/json; charset=UTF-8");

session_start();

$dataDir = __DIR__ . '/data';
if (!is_dir($dataDir)) {
    mkdir($dataDir, 0777, true);
}
$recordsFile = $dataDir . '/records.json';
$usersFile = $dataDir . '/users.json';

// Initialize users file with default credentials if not existing
if (!file_exists($usersFile)) {
    $defaultUsers = [
        [
            "username" => "admin",
            "password" => "blood1234", // Simple default password
            "name" => "অ্যাডমিন (ব্লাড ব্যাংক)"
        ]
    ];
    file_put_contents($usersFile, json_encode($defaultUsers, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));
}

// Initialize records file if not existing
if (!file_exists($recordsFile)) {
    $initialRecords = [
        [
            "id" => "rec_sample_01",
            "donorName" => "মোঃ জামাল উদ্দিন",
            "bloodGroup" => "O+",
            "donationCount" => "১ম বার",
            "donationDate" => "2026-10-07",
            "referenceName" => "বাঞ্ছারামপুর ব্লাড ব্যাংক",
            "templateId" => "bancharampur-classic",
            "orgName" => "BANCHARAMPUR BLOOD BANK",
            "orgSubtitle" => "বাঞ্ছারামপুর ব্লাড ব্যাংক",
            "slogan" => "রক্ত দেওয়ার জন্যেই আমরা",
            "heroQuote" => "রক্তের প্রয়োজনে মুমূর্ষ রোগীর পাশে",
            "quote" => "রক্তদান হোক আপনার জীবনের শ্রেষ্ঠ উপহার",
            "donorPhoto" => "",
            "createdAt" => "2026-10-07 10:00:00"
        ]
    ];
    file_put_contents($recordsFile, json_encode($initialRecords, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));
}

function getJsonInput() {
    $raw = file_get_contents('php://input');
    return json_decode($raw, true) ?: [];
}

function isAuthenticated() {
    if (!empty($_SESSION['auth_user'])) {
        return true;
    }
    // Also support Authorization header Bearer token for client API fetch
    $headers = getallheaders();
    $authHeader = $headers['Authorization'] ?? $headers['authorization'] ?? '';
    if (str_starts_with($authHeader, 'Bearer ') && substr($authHeader, 7) === 'blood_token_authenticated') {
        return true;
    }
    return false;
}

$action = $_GET['action'] ?? '';

switch ($action) {
    case 'check_auth':
        $isAuth = isAuthenticated();
        echo json_encode([
            "authenticated" => $isAuth,
            "user" => $isAuth ? ($_SESSION['auth_user'] ?? "admin") : null
        ]);
        break;

    case 'login':
        $input = getJsonInput();
        $username = trim($input['username'] ?? '');
        $password = trim($input['password'] ?? '');

        $users = json_decode(file_get_contents($usersFile), true) ?: [];
        $valid = false;
        $matchedUser = null;

        foreach ($users as $u) {
            if ($u['username'] === $username && $u['password'] === $password) {
                $valid = true;
                $matchedUser = $u;
                break;
            }
        }

        if ($valid) {
            $_SESSION['auth_user'] = $username;
            echo json_encode([
                "success" => true,
                "token" => "blood_token_authenticated",
                "user" => [
                    "username" => $matchedUser['username'],
                    "name" => $matchedUser['name']
                ],
                "message" => "লগইন সফল হয়েছে!"
            ]);
        } else {
            http_response_code(401);
            echo json_encode([
                "success" => false,
                "message" => "ভুল ইউজারনেম বা পাসওয়ার্ড!"
            ]);
        }
        break;

    case 'logout':
        $_SESSION['auth_user'] = null;
        session_destroy();
        echo json_encode(["success" => true, "message" => "লগআউট সফল হয়েছে!"]);
        break;

    case 'get_records':
        if (!isAuthenticated()) {
            http_response_code(403);
            echo json_encode([
                "success" => false,
                "message" => "রেকর্ড দেখার জন্য লগইন আবশ্যক!"
            ]);
            exit;
        }

        $records = json_decode(file_get_contents($recordsFile), true) ?: [];
        echo json_encode([
            "success" => true,
            "records" => $records
        ]);
        break;

    case 'save_record':
        if (!isAuthenticated()) {
            http_response_code(403);
            echo json_encode([
                "success" => false,
                "message" => "ডাটা সেভ করার জন্য লগইন করা আবশ্যক! আপনি চাইলে কার্ড ডাউনলোড ও শেয়ার করতে পারেন।"
            ]);
            exit;
        }

        $input = getJsonInput();
        if (empty($input['donorName'])) {
            http_response_code(400);
            echo json_encode(["success" => false, "message" => "রক্তদাতার নাম আবশ্যক!"]);
            exit;
        }

        $records = json_decode(file_get_contents($recordsFile), true) ?: [];

        $recordId = !empty($input['id']) ? $input['id'] : ('rec_' . time() . '_' . rand(100, 999));
        
        $newRecord = [
            "id" => $recordId,
            "donorName" => $input['donorName'],
            "bloodGroup" => $input['bloodGroup'] ?? 'O+',
            "donationCount" => $input['donationCount'] ?? '১ম বার',
            "donationDate" => $input['donationDate'] ?? date('Y-m-d'),
            "referenceName" => $input['referenceName'] ?? '',
            "templateId" => $input['templateId'] ?? 'bancharampur-classic',
            "orgName" => $input['orgName'] ?? 'BANCHARAMPUR BLOOD BANK',
            "orgSubtitle" => $input['orgSubtitle'] ?? 'বাঞ্ছারামপুর ব্লাড ব্যাংক',
            "slogan" => $input['slogan'] ?? 'রক্ত দেওয়ার জন্যেই আমরা',
            "heroQuote" => $input['heroQuote'] ?? 'রক্তের প্রয়োজনে মুমূর্ষ রোগীর পাশে',
            "quote" => $input['quote'] ?? 'রক্তদান হোক আপনার জীবনের শ্রেষ্ঠ উপহার',
            "donorPhoto" => $input['donorPhoto'] ?? '',
            "createdAt" => date('Y-m-d H:i:s')
        ];

        // Check if updating existing
        $found = false;
        foreach ($records as $idx => $r) {
            if ($r['id'] === $recordId) {
                $records[$idx] = $newRecord;
                $found = true;
                break;
            }
        }
        if (!$found) {
            array_unshift($records, $newRecord);
        }

        file_put_contents($recordsFile, json_encode($records, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));

        echo json_encode([
            "success" => true,
            "record" => $newRecord,
            "message" => "রেকর্ড সফলভাবে সেভ করা হয়েছে!"
        ]);
        break;

    case 'delete_record':
        if (!isAuthenticated()) {
            http_response_code(403);
            echo json_encode(["success" => false, "message" => "অনুমতি নেই!"]);
            exit;
        }

        $recordId = $_GET['id'] ?? '';
        $records = json_decode(file_get_contents($recordsFile), true) ?: [];
        $filtered = array_values(array_filter($records, fn($r) => $r['id'] !== $recordId));

        file_put_contents($recordsFile, json_encode($filtered, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));
        echo json_encode(["success" => true, "message" => "রেকর্ড ডিলিট করা হয়েছে!"]);
        break;

    default:
        echo json_encode([
            "status" => "online",
            "service" => "Blood Donation Poster API",
            "version" => "1.0.0"
        ]);
        break;
}
