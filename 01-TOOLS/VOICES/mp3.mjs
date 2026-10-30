// Float32 PCM (Kokoro output) -> mono MP3, 40 kbps: clear speech at a small size.
import lamejs from "@breezystack/lamejs";

export function toMp3(samples, sampleRate, kbps = 40) {
  const encoder = new lamejs.Mp3Encoder(1, sampleRate, kbps);
  const pcm = new Int16Array(samples.length);
  for (let i = 0; i < samples.length; i += 1) pcm[i] = Math.max(-32768, Math.min(32767, Math.round(samples[i] * 32767)));
  const chunks = [];
  for (let i = 0; i < pcm.length; i += 1152) {
    const out = encoder.encodeBuffer(pcm.subarray(i, i + 1152));
    if (out.length) chunks.push(Buffer.from(out));
  }
  const end = encoder.flush();
  if (end.length) chunks.push(Buffer.from(end));
  return Buffer.concat(chunks);
}
