import { execSync } from 'child_process';
import ffmpegStatic from 'ffmpeg-static';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const videoPath = path.join(__dirname, 'public/videos/FR315F.MP4');
const posterPath = path.join(__dirname, 'public/videos/FR315F-poster.jpg');

try {
  const command = `"${ffmpegStatic}" -i "${videoPath}" -ss 0 -vframes 1 -q:v 5 "${posterPath}" -y`;
  console.log('Running:', command);
  execSync(command, { stdio: 'inherit' });
  console.log('✓ Poster extracted successfully');
  process.exit(0);
} catch (error) {
  console.error('Error:', error.message);
  process.exit(1);
}
