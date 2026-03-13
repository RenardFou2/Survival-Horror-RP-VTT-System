const {api, sheets} = foundry.applications;
/**
 * Extend the basic ActorSheet with some very simple modifications
 * @extends {ActorSheet}
 */
export class SHRPActorSheet extends api.HandlebarsApplicationMixin(sheets.ActorSheet)  {
  /** @inheritdoc */
  static DEFAULT_OPTIONS = {
    classes: ["actor"],
    position: {
      width: 600,
      height: 600
    },
    form: {
      submitOnChange: true
    },
    window: {
      resizable: true,
    }
  }
  
  /** @inheritdoc */
  static PARTS = {
    wholeSheetForNow: {
      template: "templates/actor/humanSheet.hbs",
    }
  }

  async _prepareContext(options) {
    const context = await super._prepareContext(options);
    context.actor = this.actor;
    context.system = this.actor.system;
    return context;
  }
}   