"use client";

import { useNewsContext } from "@/context/NewsContext";
import { countries } from "@/data/countries";
import { languages } from "@/data/languages";

export default function FilterBar() {
  const { filters, setCountry, setLang } = useNewsContext();

  return (
    <div className="flex flex-wrap gap-4 items-center">
      <select
        value={filters.country}
        onChange={(e) => setCountry((e.target.value || "") as "")}
        className="bg-[#111214] text-[#ddd] border border-[#333] rounded-lg px-3 py-2 text-sm sm:text-base md:text-lg font-outfit outline-none focus:border-[#b88efc]"
      >
        <option value="">All Countries</option>
        {countries.map((c) => (
          <option key={c.code} value={c.code}>
            {c.name}
          </option>
        ))}
      </select>
      <select
        value={filters.lang}
        onChange={(e) => setLang((e.target.value || "") as "")}
        className="bg-[#111214] text-[#ddd] border border-[#333] rounded-lg px-3 py-2 text-sm sm:text-base md:text-lg font-outfit outline-none focus:border-[#b88efc]"
      >
        <option value="">All Languages</option>
        {languages.map((l) => (
          <option key={l.code} value={l.code}>
            {l.name}
          </option>
        ))}
      </select>
    </div>
  );
}
