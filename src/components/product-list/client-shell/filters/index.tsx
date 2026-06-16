"use client";
import { ComponentType } from "react";

export default function ProductListFilters({
  handleSetFilter,
  filters,
  selectedFilter,
}: {
  handleSetFilter: (value: number) => void;
  filters: {
    label: string;
    value: string;
    Icon: ComponentType<{ className?: string }>;
  }[];
  selectedFilter: string[];
}) {
  return (
    <section className="mb-10 flex items-center justify-between">
      {filters?.map((item, index) => {
        const Icon = item.Icon;
        return (
          <button
            className={`flex flex-col items-center gap-2 rounded-lg ${
              selectedFilter.includes(item.value)
                ? "text-blue-500"
                : "text-gray-800"
            }`}
            onClick={() => {
              handleSetFilter(index);
            }}
            key={item.value}
          >
            <Icon className="text-3xl" />
            <span className="text-sm font-medium">{item.label}</span>
          </button>
        );
      })}
    </section>
  );
}
