update public.users
set password_hash = '$2b$10$kIQcjSj9kRet949boJ2deuKFDgiyYesOsGjuiFK9eMGKOI2oGCcnu',
    updated_at = now()
where username = 'GURUHEBAT';
