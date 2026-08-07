import cornIcon from "@/assets/rules/tzolkin/corn.webp";
import monumentsIcon from "@/assets/rules/tzolkin/monuments.webp";
import skullsIcon from "@/assets/rules/tzolkin/skulls.webp";
import type { GameFieldRules } from "./types";

/**
 * Source: official Tzolk'in: The Mayan Calendar rules by CGE,
 * the 'Final Scoring' section (EN) and its counterpart in the RU booklet.
 * The texts are verbatim.
 *
 * The `track` field is missing here on purpose: the victory point track is
 * not an entry of the final scoring, and no verbatim wording exists for it
 * in the rules. It keeps its letter and its own hint.
 */
export const tzolkinFieldRules: GameFieldRules = {
  corn: {
    icon: cornIcon,
    text: {
      ru: "Превращает все ресурсы в маис по таблице обмена. Получает 1/4 победного очка за каждый маис.",
      en: "Convert all resources to corn using the exchange rate for the market. Score 1/4 victory point for each corn.",
      zh: "按市场兑换比率将所有资源换成玉米。每个玉米得 1/4 分。",
    },
  },
  skulls: {
    icon: skullsIcon,
    text: {
      ru: "Получает 3 победных очка за каждый оставшийся у него хрустальный череп.",
      en: "Score 3 victory points for each crystal skull you still have.",
      zh: "每保留一个水晶头骨得 3 分。",
    },
  },
  monuments: {
    icon: monumentsIcon,
    text: {
      ru: "Получает победные очки за свои дворцы.",
      en: "Score your victory points from your monuments.",
      zh: "结算你的纪念碑所提供的分数。",
    },
  },
};
