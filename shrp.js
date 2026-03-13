import SHRP from "./modules/system/config.js";
import { SystemActor } from "./modules/documents/Actor.js";
import { SystemItem } from "./modules/documents/Item.js";
import { HumanDataModel, EnemyDataModel } from "./modules/data/Actor.js";
import { WeaponDataModel } from "./modules/data/Item.js";
import { HumanSheet } from "./modules/apps/actor/HumanSheet.js";

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
    weapon: WeaponDataModel,
  };

  foundry.documents.collections.Actors.registerSheet("shrp", HumanSheet, {
    makeDefault: true, label: "SHRP.Sheets.Labels.HumanSheet"
  });
});