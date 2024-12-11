import Image from "next/image";

interface Subject {
  id?: number;
  name?: string;
  icon?:string
}

interface SingleSubjectProps {
  subjects: Subject;
}

export default function SingleSubject({ subjects }: SingleSubjectProps) {
  return (
    <>
    <div className="bg-pink-400  rounded-[8.44px]">
      {subjects?.icon ? (
        <Image 
          src={subjects.icon} 
          alt={subjects?.name || "Subject"} 
          width={330} 
          height={293} 
        />
      ) : (
        <div className="w-full h-full bg-gray-300 flex items-center justify-center text-white">
          No Icon
        </div>
      )}
    </div>
    </>
  );
}

/**
 * 
 * 
 * width: 330.17px;
height: 292.65px;
top: 0.18px;
gap: 0px;
border-radius: 8.44px 0px 0px 0px;
opacity: 0px;
w-[330.17px] h-[292.65px]
 */
