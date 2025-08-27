-- Insert default admin user
INSERT INTO users (username, email, password, role) VALUES 
('admin', 'admin@zalpay.com', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'admin')
ON CONFLICT (username) DO NOTHING;

-- Insert initial applications
INSERT INTO applications (name, slug, price, variants, available, image_path, description, category, features) VALUES 
('Alight Motion', 'alight-motion', 25000, '["Premium Monthly", "Premium Yearly"]', true, '/images/apps/alight-motion.png', 'Video editing app dengan fitur profesional', 'Video', '["Professional video editing", "Animation tools", "Effects library", "No watermark"]'),
('Apple Music', 'apple-music', 20000, '["Individual", "Family", "Student"]', true, '/images/apps/apple-music.png', 'Streaming musik dari Apple dengan kualitas lossless', 'Music', '["High-quality audio", "Offline downloads", "Exclusive content", "Cross-device sync"]'),
('Canva Lifetime', 'canva-lifetime', 150000, '["Lifetime Access"]', true, '/images/apps/canva-lifetime.png', 'Akses seumur hidup ke Canva Pro', 'Productivity', '["Unlimited designs", "Premium templates", "Brand kit", "Team collaboration"]'),
('Canva Pro', 'canva-pro', 35000, '["Monthly", "Yearly"]', true, '/images/apps/canva-pro.png', 'Design tools profesional dari Canva', 'Productivity', '["Premium templates", "Background remover", "Brand kit", "Magic resize"]'),
('CapCut Basic', 'capcut-basic', 15000, '["Basic Monthly"]', true, '/images/apps/capcut-basic.png', 'Video editor mobile yang mudah digunakan', 'Video', '["Easy video editing", "Basic effects", "Music library", "Export in HD"]'),
('CapCut Pro', 'capcut-pro', 30000, '["Pro Monthly", "Pro Yearly"]', true, '/images/apps/capcut-pro.png', 'CapCut dengan fitur premium lengkap', 'Video', '["Advanced editing", "Premium effects", "4K export", "No watermark"]'),
('Prime Video', 'prime-video', 25000, '["Monthly", "Yearly"]', true, '/images/apps/prime-video.png', 'Streaming video dari Amazon Prime', 'Video', '["HD/4K streaming", "Original content", "Download for offline", "Multiple profiles"]'),
('Scribd', 'scribd', 20000, '["Monthly Unlimited"]', true, '/images/apps/scribd.png', 'Unlimited access ke ebooks dan audiobooks', 'Education', '["Unlimited reading", "Audiobooks", "Magazines", "Documents"]'),
('Spotify Premium', 'spotify-premium', 18000, '["Individual", "Duo", "Family", "Student"]', true, '/images/apps/spotify-premium.png', 'Streaming musik tanpa iklan dengan kualitas tinggi', 'Music', '["Ad-free music", "Offline downloads", "High-quality audio", "Unlimited skips"]'),
('VPN Express', 'vpn-express', 40000, '["1 Month", "6 Months", "12 Months"]', true, '/images/apps/vpn-express.png', 'VPN cepat dan aman untuk browsing', 'Security', '["Fast connection", "Global servers", "No logs policy", "24/7 support"]'),
('VPN HMA', 'vpn-hma', 35000, '["1 Month", "12 Months"]', true, '/images/apps/vpn-hma.png', 'Hide My Ass VPN dengan server global', 'Security', '["Global server network", "IP protection", "Streaming support", "Easy to use"]'),
('VPN Surfshark', 'vpn-surfshark', 30000, '["1 Month", "12 Months", "24 Months"]', true, '/images/apps/vpn-surfshark.png', 'VPN unlimited devices dengan fitur lengkap', 'Security', '["Unlimited devices", "CleanWeb", "MultiHop", "Bypasser"]'),
('Viu', 'viu', 15000, '["Premium Monthly"]', true, '/images/apps/viu.png', 'Streaming drama Asia dan konten premium', 'Video', '["Asian dramas", "Exclusive content", "HD streaming", "Offline viewing"]')
ON CONFLICT (slug) DO NOTHING;
