let loading;

export function loadYouTube() {
  if (window.YT?.Player) return Promise.resolve(window.YT);
  loading ||= new Promise((resolve, reject) => {
    const previous = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => { previous?.(); resolve(window.YT); };
    const script = document.createElement("script");
    script.src = "https://www.youtube.com/iframe_api";
    script.onerror = () => { loading = null; reject(new Error("YouTube could not be loaded")); };
    document.head.append(script);
  });
  return loading;
}
