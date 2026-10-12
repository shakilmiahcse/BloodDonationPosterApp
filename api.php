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

// Initialize files if not existing
if (!file_exists($usersFile)) {
    file_put_contents($usersFile, json_encode([], JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));
}

if (!file_exists($recordsFile)) {
    file_put_contents($recordsFile, json_encode([], JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));
}

function getJsonInput() {
    $raw = file_get_contents('php://input');
    return json_decode($raw, true) ?: [];
}

function getUsers() {
    global $usersFile;
    if (!file_exists($usersFile)) return [];
    return json_decode(file_get_contents($usersFile), true) ?: [];
}

function saveUsers($users) {
    global $usersFile;
    file_put_contents($usersFile, json_encode($users, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE), LOCK_EX);
}

function getRecords() {
    global $recordsFile;
    if (!file_exists($recordsFile)) return [];
    return json_decode(file_get_contents($recordsFile), true) ?: [];
}

function saveRecords($records) {
    global $recordsFile;
    file_put_contents($recordsFile, json_encode($records, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE), LOCK_EX);
}

function getCurrentUser() {
    $headers = getallheaders();
    $authHeader = $headers['Authorization'] ?? $headers['authorization'] ?? '';
    
    $token = '';
    if (str_starts_with($authHeader, 'Bearer ')) {
        $token = trim(substr($authHeader, 7));
    } elseif (!empty($_SESSION['auth_token'])) {
        $token = $_SESSION['auth_token'];
    }

    if (!$token) return null;

    // Token format: usr_[id]_[hash]
    $users = getUsers();
    foreach ($users as $u) {
        if (!empty($u['token']) && $u['token'] === $token) {
            return $u;
        }
    }
    return null;
}

$action = $_GET['action'] ?? '';

switch ($action) {
    case 'check_auth':
        $user = getCurrentUser();
        if ($user) {
            echo json_encode([
                "authenticated" => true,
                "user" => [
                    "id" => $user['id'],
                    "username" => $user['username'],
                    "name" => $user['name'],
                    "orgSettings" => $user['orgSettings'] ?? []
                ]
            ]);
        } else {
            echo json_encode([
                "authenticated" => false,
                "user" => null
            ]);
        }
        break;

    case 'register':
        $input = getJsonInput();
        $name = trim($input['name'] ?? '');
        $username = strtolower(trim($input['username'] ?? ''));
        $password = trim($input['password'] ?? '');

        if (empty($name) || empty($username) || empty($password)) {
            http_response_code(400);
            echo json_encode([
                "success" => false,
                "message" => "All fields (Name, Username, Password) are required."
            ]);
            exit;
        }

        if (strlen($password) < 4) {
            http_response_code(400);
            echo json_encode([
                "success" => false,
                "message" => "Password must be at least 4 characters long."
            ]);
            exit;
        }

        $users = getUsers();
        foreach ($users as $u) {
            if ($u['username'] === $username) {
                http_response_code(409);
                echo json_encode([
                    "success" => false,
                    "message" => "This username is already registered. Please choose another username or log in."
                ]);
                exit;
            }
        }

        $userId = 'usr_' . time() . '_' . rand(1000, 9999);
        $token = 'token_' . $userId . '_' . bin2hex(random_bytes(8));

        $orgSettings = [
            "orgName" => trim($input['orgName'] ?? ''),
            "orgSubtitle" => trim($input['orgSubtitle'] ?? ''),
            "slogan" => trim($input['slogan'] ?? 'রক্ত দেওয়ার জন্যেই আমরা'),
            "heroQuote" => trim($input['heroQuote'] ?? 'রক্তের প্রয়োজনে মুমূর্ষ রোগীর পাশে'),
            "quote" => trim($input['quote'] ?? 'রক্তদান হোক আপনার জীবনের শ্রেষ্ঠ উপহার'),
            "templateId" => trim($input['templateId'] ?? 'bancharampur-classic'),
            "orgLogo" => $input['orgLogo'] ?? ''
        ];

        $newUser = [
            "id" => $userId,
            "username" => $username,
            "password" => password_hash($password, PASSWORD_DEFAULT),
            "name" => $name,
            "token" => $token,
            "orgSettings" => $orgSettings,
            "createdAt" => date('Y-m-d H:i:s')
        ];

        $users[] = $newUser;
        saveUsers($users);

        $_SESSION['auth_token'] = $token;

        echo json_encode([
            "success" => true,
            "token" => $token,
            "user" => [
                "id" => $userId,
                "username" => $username,
                "name" => $name,
                "orgSettings" => $orgSettings
            ],
            "message" => "Registration successful! You are now logged in."
        ]);
        break;

    case 'login':
        $input = getJsonInput();
        $username = strtolower(trim($input['username'] ?? ''));
        $password = trim($input['password'] ?? '');

        if (empty($username) || empty($password)) {
            http_response_code(400);
            echo json_encode([
                "success" => false,
                "message" => "Please enter both username and password."
            ]);
            exit;
        }

        $users = getUsers();
        $matchedUser = null;
        $matchedIndex = -1;

        foreach ($users as $idx => $u) {
            if ($u['username'] === $username) {
                // Verify hashed password, with legacy fallback for plaintext
                $isPassValid = password_verify($password, $u['password']) || ($u['password'] === $password);
                if ($isPassValid) {
                    $matchedUser = $u;
                    $matchedIndex = $idx;
                    // Auto-rehash if stored in plaintext
                    if ($u['password'] === $password) {
                        $users[$idx]['password'] = password_hash($password, PASSWORD_DEFAULT);
                    }
                    break;
                }
            }
        }

        if ($matchedUser) {
            $token = 'token_' . $matchedUser['id'] . '_' . bin2hex(random_bytes(8));
            $users[$matchedIndex]['token'] = $token;
            saveUsers($users);

            $_SESSION['auth_token'] = $token;

            echo json_encode([
                "success" => true,
                "token" => $token,
                "user" => [
                    "id" => $matchedUser['id'],
                    "username" => $matchedUser['username'],
                    "name" => $matchedUser['name'],
                    "orgSettings" => $matchedUser['orgSettings'] ?? []
                ],
                "message" => "Login successful!"
            ]);
        } else {
            http_response_code(401);
            echo json_encode([
                "success" => false,
                "message" => "Invalid username or password. If you don't have an account, please register first."
            ]);
        }
        break;

    case 'logout':
        $user = getCurrentUser();
        if ($user) {
            $users = getUsers();
            foreach ($users as $idx => $u) {
                if ($u['id'] === $user['id']) {
                    $users[$idx]['token'] = '';
                    break;
                }
            }
            saveUsers($users);
        }
        $_SESSION['auth_token'] = null;
        session_destroy();
        echo json_encode(["success" => true, "message" => "Successfully logged out."]);
        break;

    case 'save_settings':
        $user = getCurrentUser();
        if (!$user) {
            http_response_code(401);
            echo json_encode(["success" => false, "message" => "Login required to save organization settings."]);
            exit;
        }

        $input = getJsonInput();
        $users = getUsers();
        foreach ($users as $idx => $u) {
            if ($u['id'] === $user['id']) {
                $users[$idx]['orgSettings'] = array_merge($u['orgSettings'] ?? [], [
                    "orgName" => $input['orgName'] ?? ($u['orgSettings']['orgName'] ?? ''),
                    "orgSubtitle" => $input['orgSubtitle'] ?? ($u['orgSettings']['orgSubtitle'] ?? ''),
                    "slogan" => $input['slogan'] ?? ($u['orgSettings']['slogan'] ?? ''),
                    "heroQuote" => $input['heroQuote'] ?? ($u['orgSettings']['heroQuote'] ?? ''),
                    "quote" => $input['quote'] ?? ($u['orgSettings']['quote'] ?? ''),
                    "templateId" => $input['templateId'] ?? ($u['orgSettings']['templateId'] ?? 'bancharampur-classic'),
                    "orgLogo" => $input['orgLogo'] ?? ($u['orgSettings']['orgLogo'] ?? '')
                ]);
                saveUsers($users);
                echo json_encode([
                    "success" => true,
                    "orgSettings" => $users[$idx]['orgSettings'],
                    "message" => "Organization settings saved successfully."
                ]);
                exit;
            }
        }
        break;

    case 'get_records':
        $user = getCurrentUser();
        if (!$user) {
            http_response_code(403);
            echo json_encode([
                "success" => false,
                "message" => "Login required to access saved donor records."
            ]);
            exit;
        }

        // Multi-user isolation: return only this user's records
        $allRecords = getRecords();
        $userRecords = array_values(array_filter($allRecords, fn($r) => ($r['userId'] ?? '') === $user['id']));

        echo json_encode([
            "success" => true,
            "records" => $userRecords
        ]);
        break;

    case 'save_record':
        $user = getCurrentUser();
        if (!$user) {
            http_response_code(403);
            echo json_encode([
                "success" => false,
                "message" => "Registration / Login is required to save records to your account."
            ]);
            exit;
        }

        $input = getJsonInput();
        if (empty($input['donorName'])) {
            http_response_code(400);
            echo json_encode(["success" => false, "message" => "Donor name is required."]);
            exit;
        }

        $allRecords = getRecords();
        $recordId = !empty($input['id']) ? $input['id'] : ('rec_' . time() . '_' . rand(100, 999));

        $newRecord = [
            "id" => $recordId,
            "userId" => $user['id'], // Stored strictly with the owner user ID
            "donorName" => $input['donorName'],
            "bloodGroup" => $input['bloodGroup'] ?? 'O+',
            "donationCount" => $input['donationCount'] ?? '1st Time',
            "donationDate" => $input['donationDate'] ?? date('Y-m-d'),
            "referenceName" => trim($input['referenceName'] ?? ''),
            "templateId" => $input['templateId'] ?? ($user['orgSettings']['templateId'] ?? 'bancharampur-classic'),
            "orgName" => $input['orgName'] ?? ($user['orgSettings']['orgName'] ?? ''),
            "orgSubtitle" => $input['orgSubtitle'] ?? ($user['orgSettings']['orgSubtitle'] ?? ''),
            "slogan" => $input['slogan'] ?? ($user['orgSettings']['slogan'] ?? ''),
            "heroQuote" => $input['heroQuote'] ?? ($user['orgSettings']['heroQuote'] ?? ''),
            "quote" => $input['quote'] ?? ($user['orgSettings']['quote'] ?? ''),
            "orgLogo" => $input['orgLogo'] ?? ($user['orgSettings']['orgLogo'] ?? '/default_org_logo.png'),
            "donorPhoto" => $input['donorPhoto'] ?? '',
            "createdAt" => date('Y-m-d H:i:s')
        ];

        // Check if updating existing record belonging to this user
        $found = false;
        foreach ($allRecords as $idx => $r) {
            if ($r['id'] === $recordId) {
                // Ensure ownership
                if (($r['userId'] ?? '') === $user['id']) {
                    $allRecords[$idx] = $newRecord;
                    $found = true;
                }
                break;
            }
        }
        if (!$found) {
            array_unshift($allRecords, $newRecord);
        }

        saveRecords($allRecords);

        // Also save user's current template and org settings for future entries
        $users = getUsers();
        foreach ($users as $idx => $u) {
            if ($u['id'] === $user['id']) {
                $users[$idx]['orgSettings']['templateId'] = $newRecord['templateId'];
                if (!empty($newRecord['orgName'])) $users[$idx]['orgSettings']['orgName'] = $newRecord['orgName'];
                if (!empty($newRecord['orgSubtitle'])) $users[$idx]['orgSettings']['orgSubtitle'] = $newRecord['orgSubtitle'];
                if (!empty($newRecord['orgLogo'])) $users[$idx]['orgSettings']['orgLogo'] = $newRecord['orgLogo'];
                if (!empty($newRecord['slogan'])) $users[$idx]['orgSettings']['slogan'] = $newRecord['slogan'];
                if (!empty($newRecord['heroQuote'])) $users[$idx]['orgSettings']['heroQuote'] = $newRecord['heroQuote'];
                if (!empty($newRecord['quote'])) $users[$idx]['orgSettings']['quote'] = $newRecord['quote'];
                saveUsers($users);
                break;
            }
        }

        echo json_encode([
            "success" => true,
            "record" => $newRecord,
            "message" => "Donor record saved successfully to your account."
        ]);
        break;

    case 'delete_record':
        $user = getCurrentUser();
        if (!$user) {
            http_response_code(403);
            echo json_encode(["success" => false, "message" => "Unauthorized."]);
            exit;
        }

        $recordId = $_GET['id'] ?? '';
        $allRecords = getRecords();

        // Only delete if belongs to current user
        $filtered = array_values(array_filter($allRecords, function($r) use ($recordId, $user) {
            if ($r['id'] === $recordId) {
                return ($r['userId'] ?? '') !== $user['id']; // Keep if not owned by user
            }
            return true;
        }));

        saveRecords($filtered);
        echo json_encode(["success" => true, "message" => "Record deleted successfully."]);
        break;

    default:
        echo json_encode([
            "status" => "online",
            "service" => "Blood Donation Poster Manager",
            "version" => "2.0.0"
        ]);
        break;
}
