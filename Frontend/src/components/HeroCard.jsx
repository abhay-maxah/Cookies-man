import heroVideo from "../assets/HeroCard.mp4";

export default function HeroCard() {
  return (
    <div className="relative w-full mt-1  min-h-screen md:h-[500px] md:mt-2 lg:h-[600px] lg:mt-2 flex items-center justify-center text-center">
      {/* Background Video */}
     
      <video
        className="absolute inset-0 w-full h-full object-cover "
        autoPlay
        loop
        muted
      >
        <source src={heroVideo} type="video/mp4" />
      </video>
    
      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-40"></div>
      
      {/* Content */}
      <div className="relative z-10 text-white">
        <h1 className="text-3xl md:text-5xl font-bold">Cozy up with our new cookie collection</h1>
        <button className="mt-4 px-6 py-3 bg-[#F64F14] hover:bg-red-600 transition-colors duration-300 text-white text-lg font-semibold rounded-full shadow-md">
  Shop Now
</button>
      </div>
    </div>
  );
}