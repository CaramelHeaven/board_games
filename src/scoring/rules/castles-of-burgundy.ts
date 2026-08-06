import goodsIcon from "@/assets/rules/castles-of-burgundy/goods.webp";
import silverIcon from "@/assets/rules/castles-of-burgundy/silver.webp";
import workersIcon from "@/assets/rules/castles-of-burgundy/workers.webp";
import yellowTilesIcon from "@/assets/rules/castles-of-burgundy/yellow-tiles.webp";
import type { GameFieldRules } from "./types";

/**
 * Источник — официальные правила «Замки Бургундии», раздел «Окончание игры»
 * (русское издание Hobby World) и «Game End» (английское издание alea).
 * Тексты приведены дословно.
 *
 * Поля `track` здесь нет намеренно: счётчик победных очков — не пункт
 * финального подсчёта, дословной формулировки под него в правилах не существует.
 */
export const castlesOfBurgundyFieldRules: GameFieldRules = {
  goods: {
    icon: goodsIcon,
    text: {
      ru: "Каждый непроданный жетон товаров: 1 победное очко.",
      en: "Each unsold goods tile: 1 victory point.",
      zh: "每个未售出的货物板块得 1 分。",
    },
  },
  silver: {
    icon: silverIcon,
    text: {
      ru: "Каждая непотраченный серебряный самородок: 1 победное очко.",
      en: "Each remaining Silverling: 1 victory point.",
      zh: "每个剩余的银锭得 1 分。",
    },
  },
  workers: {
    icon: workersIcon,
    text: {
      ru: "Каждые 2 жетона рабочих: 1 победное очко.",
      en: "Every two worker tiles: 1 victory point.",
      zh: "每 2 个工人板块得 1 分。",
    },
  },
  yellowTiles: {
    icon: yellowTilesIcon,
    text: {
      ru: "Столько победных очков, сколько указано на жёлтых жетонах (см. стр. 10 и 11). Шестиугольные жетоны, выложенные в левом нижнем углу планшета, не приносят победных очков.",
      en: "Each VP-bearing yellow tile (see pages 10 and 11). Note: Six-sided tiles remaining on the storage spaces of a player's board are not scored!",
      zh: "按黄色板块上标示的分数计分（见规则第 10、11 页）。放在玩家板左下角储存格的六角板块不计分。",
    },
  },
};
