import type { MDXComponents } from "mdx/types";

import {
  UserDbPlanPrice,
  UserDbPlanPriceLabel,
  UserDbPlanSpecTable,
  UserDbPlanValue,
  UserDbStorageOverageSection,
} from "@/components/docs/user-db-plan-spec";
import {
  ServerlessPlanMeters,
  ServerlessPlanValue,
} from "@/components/docs/serverless-plan-spec";

const components: MDXComponents = {
  UserDbPlanSpecTable,
  UserDbPlanPriceLabel,
  UserDbPlanPrice,
  UserDbPlanValue,
  UserDbStorageOverageSection,
  ServerlessPlanMeters,
  ServerlessPlanValue,
};

export function useMDXComponents(): MDXComponents {
  return components;
}
