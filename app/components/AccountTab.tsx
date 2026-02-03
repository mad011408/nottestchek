"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { useGlobalState } from "@/app/contexts/GlobalState";
import { usePentestgptMigration } from "@/app/hooks/usePentestgptMigration";
import { ultraFeatures } from "@/lib/pricing/features";

const AccountTab = () => {
  const { setMigrateFromPentestgptDialogOpen } = useGlobalState();
  const { isMigrating } = usePentestgptMigration();

  return (
    <div className="space-y-6 min-h-0">
      <div className="border-b py-2">
        <div className="flex items-center justify-between">
          <div>
            <div className="font-medium">
              HackerAI Ultra
            </div>
          </div>
        </div>

        <div className="mt-2 rounded-lg bg-transparent px-0">
          <span className="text-sm font-semibold inline-block pb-4">
            Thanks for using Ultra! Your plan includes:
          </span>
          <ul className="mb-2 flex flex-col gap-5">
            {ultraFeatures.map((feature, index) => (
              <li key={index} className="relative">
                <div className="flex justify-start gap-3.5">
                  <feature.icon className="h-5 w-5 shrink-0" />
                  <span className="font-normal">{feature.text}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export { AccountTab };
