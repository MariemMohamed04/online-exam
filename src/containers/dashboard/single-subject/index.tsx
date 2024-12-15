import Image from "next/image";
import Link from "next/link";

interface Subject {
  _id?: string;
  name?: string;
  icon?: string;
}

interface SingleSubjectProps {
  subjects: Subject;
}

export default function SingleSubject({ subjects }: SingleSubjectProps) {
  return (
    <>
      <div className="rounded-[8.44px]">
      <Link href={`/dashboard/exams/${subjects._id}`}>
        <div className="relative">
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
          <div
            className="absolute w-[276.14px] h-[66.03px] rounded-[8.44px] top-[199.78px] left-[27.01px] px-[15.1px] pt-[11px]"
            style={{
              background: 'rgba(25, 53, 202, 0.4)',
              backdropFilter: 'blur(27.01353645324707px)',
            }}
          >
            <span className="text-[13.51px] font-bold text-white">{subjects.name}</span>
            <p className="text-[11.82px] font-medium text-white">Voluptatem aut ut dignissimos blanditiis</p>
          </div>
        </div>
        </Link>
      </div>
    </>
  );
}
/**
width: 276.14px;
height: 66.03px;
top: 199.78px;
left: 27.01px;
gap: 0px;
border-radius: 8.44px 0px 0px 0px;
opacity: 0px;

background: rgba(25, 53, 202, 0.4);

backdrop-filter: blur(27.01353645324707px)


 */
