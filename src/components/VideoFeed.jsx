const VideoFeed = () => {
  return (
    <div className="glassy rounded-lg w-full h-full p-4 flex items-center justify-center">
      <div className="relative w-full h-full flex items-center justify-center bg-gray-200/20 dark:bg-gray-800/20 rounded-md overflow-hidden">
        <img
          alt="Webcam feed"
          className="object-cover w-full h-full rounded-md"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuB1fJg1N5AJ1JJU37oJJ3Rr1Vl5tfpfZ5mCfyQ6-qQZPWdbpgfo9LJD6GWu_r6zT_7ifuMzZ-FJUywUv7Fbw4wuW5bOuLBqJEvRRQvVL1Bk3LwIP8XeLKx_H5PaBFGQ3aMPrdkUrFyJtgdsaA1lnlA_Q845WLvVRjW7HlZevzDqAFqyk3OYpFOG4IWVc3XzTb9lmQe33DXiF8yiIH_n4ht8GHDfO_5WL_c7NIAN_Yg5SfRpPtjL0655XLhWbPtyRrorDaqlUz7nySwR"
        />
        <div className="absolute bottom-4 left-4 bg-black/30 text-white px-3 py-1 rounded-full text-sm flex items-center gap-2">
          <span className="material-symbols-outlined text-base">videocam</span>
          <span>CAM-01</span>
        </div>
      </div>
    </div>
  );
};

export default VideoFeed;
