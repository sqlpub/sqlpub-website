import type { MDXComponents } from "mdx/types";

import {
  UserDbPlanPrice,
  UserDbPlanPriceLabel,
  UserDbPlanSpecTable,
  UserDbPlanValue,
  UserDbStorageOverageSection,
} from "@/components/docs/user-db-plan-spec";

const components: MDXComponents = {
  UserDbPlanSpecTable,
  UserDbPlanPriceLabel,
  UserDbPlanPrice,
  UserDbPlanValue,
  UserDbStorageOverageSection,
};

export function useMDXComponents(): MDXComponents {
  return components;
}
