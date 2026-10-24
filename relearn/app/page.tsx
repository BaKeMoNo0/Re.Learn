import Link from "next/link";

export default function Home() {

  return (
    <div className="flex flex-col flex-1 items-center bg-zinc-50 font-sans dark:bg-black">
      <h1 className="text-4xl font-bold text-zinc-900 dark:text-zinc-50">
        ReLearn
      </h1>
      <div className="mt-10 mr-20 w-full flex justify-end">
        <Link 
          href="/folio" 
          className="rounded-md bg-yellow-500 px-4 py-2 text-white hover:bg-yellow-600"
        >
          Folio
        </Link>
      </div>
    </div>
  );
  /*
  tu pars d'un problème à résoudre, tu découvres les connaissances dont tu as besoin, tu les étudies au moment où elles deviennent utiles, puis tu construis une solution.
  Le projet donne envie d'apprendre, le problème fait émerger le besoin, la fiche apporte les connaissances et l'implémentation permet de les maîtriser.
  
  */
}
