import SHRP from "./modules/system/config.js";
import { SystemActor } from "./modules/documents/Actor.js";
import { SystemItem } from "./modules/documents/Item.js";
import { HumanDataModel, EnemyDataModel } from "./modules/data/Actor.js";
import { ItemDataModel, WeaponDataModel, ConsumableDataModel } from "./modules/data/Item.js";
import { HumanSheet } from "./modules/apps/actor/HumanSheet.js";
import { SHRPItemSheet } from "./modules/apps/item/ItemSheet.js";

Hooks.once("init", () => {
  CONFIG.SHRP = SHRP;

  // Configure custom Document implementations.
  CONFIG.Actor.documentClass = SystemActor;
  CONFIG.Item.documentClass = SystemItem;

  // Configure System Data Models.
  CONFIG.Actor.dataModels = {
    human: HumanDataModel,
    enemy: EnemyDataModel
  };
  CONFIG.Item.dataModels = {
    key: ItemDataModel, // Key items just need the base fields, might expand later
    weapon: WeaponDataModel,
    consumable: ConsumableDataModel
  };

  foundry.documents.collections.Actors.registerSheet("shrp", HumanSheet, {
    makeDefault: true, label: "SHRP.Sheets.Labels.HumanSheet"
  });
  foundry.documents.collections.Items.registerSheet("shrp", SHRPItemSheet, {
    makeDefault: true, label: "SHRP.Sheets.Labels.ItemSheet"
  });
});