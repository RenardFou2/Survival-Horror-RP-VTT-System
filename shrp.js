import { SystemActor } from "./modules/documents/Actor.js";
import { SystemItem } from "./modules/documents/Item.js";
import { HumanDataModel, EnemyDataModel } from "./modules/data/Actor.js";
import { WeaponDataModel } from "./modules/data/Item.js";

Hooks.once("init", () => {
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
});