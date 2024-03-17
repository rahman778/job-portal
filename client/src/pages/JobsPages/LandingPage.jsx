import SearchFilter from "../../components/Filter/SearchFilter";
import JobCard from "../../components/Cards/JobCard";

import heroImage from "../../assets/hero.jpg";

function LandingPage() {
   return (
      <section>
         {/* Hero */}
         <div
            className="relative bg-cover bg-center h-screen max-h-[55vh]"
            style={{ backgroundImage: `url(${heroImage})` }}
         >
            <div className="absolute inset-0 bg-gray-900 opacity-70"></div>

            <div className="absolute inset-0 flex justify-center items-center px-4 lg:px-8 xl:px-16">
               <div className="text-center text-white">
                  <h1 className="text-3xl md:text-5xl font-medium mb-4 tracking-wide">
                     Connecting Talent with{" "}
                     <span className="text-emerald-500">Opportunity</span>
                  </h1>
                  {/* <p className="text-lg md:text-xl">Your subtext here</p> */}
                  <div className="max-w-3xl mx-auto mt-10">
                     <SearchFilter />
                  </div>
               </div>
            </div>
         </div>
         {/* Job List */}
         <div className="max-w-6xl xl:max-w-screen-xl 2xl:max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 2xl:px-12 mt-10">
            <div className="flex gap-x-3">
               <div className="hidden md:block divide-y w-1/4 border dark:border-slate-600 dark:divide-slate-600 rounded-md h-full sticky top-8 ">
                  <div className="min-h-14 flex items-center justify-between text-md  px-3 hover-transition !border-l-transparent hover:!border-l-primary border-l-[3px] hover:bg-emerald-600/10 cursor-pointer">
                     <span>IT/Software</span>
                     <span className="bg-emerald-600/20 text-primary text-xs text-center py-0.5 font-semibold rounded-full h-6 w-8 leading-relaxed">
                        10
                     </span>
                  </div>
                  <div className="min-h-14 flex items-center px-3 hover-transition !border-l-transparent hover:!border-l-primary border-l-[3px] hover:bg-emerald-600/10 cursor-pointer">
                     01
                  </div>
                  <div className="min-h-14 flex items-center px-3 hover-transition !border-l-transparent hover:!border-l-primary border-l-[3px] hover:bg-emerald-600/10 cursor-pointer">
                     01
                  </div>
                  <div className="min-h-14 flex items-center px-3 hover-transition !border-l-transparent hover:!border-l-primary border-l-[3px] hover:bg-emerald-600/10 cursor-pointer">
                     01
                  </div>
                  <div className="min-h-14 flex items-center px-3 hover-transition !border-l-transparent hover:!border-l-primary border-l-[3px] hover:bg-emerald-600/10 cursor-pointer">
                     01
                  </div>
               </div>
               <div className="flex-1">
                  <JobCard />
                  <JobCard />
                  <JobCard />
               </div>
            </div>
         </div>
      </section>
   );
}

export default LandingPage;
