const ImageCard = () => {
  return (
    <div className="glassy rounded-lg flex-1 p-4 overflow-hidden">
      <div
        className="w-full h-full bg-center bg-cover rounded-md"
        style={{
          backgroundImage:
            "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAQM4Xagpg1gaXrQ-WTL6PunGIaijNmVxP0ZuxrtkpV9-bP6Ee_X-Tq-q1QZrGma32rm-4R0JpM2gweiHa1DbdGPkTIcB2rsFbaogWGNJsvtesXYFiS7dIsAesNlclPiBbvDg2_rwL_iz5aRJlHb7hW0UVnC63cFqnAdZqF_RdLqa9GhZFXWeJNyl1B-9r_xghP5Ubp6_NO619XoXRXHqQpqt6wv8Gqzgnk01FmMwNyC_A2jf7qbOx-7jBHTZJcMfXqVWROroHZFACt')",
        }}
      />
    </div>
  );
};

export default ImageCard;
