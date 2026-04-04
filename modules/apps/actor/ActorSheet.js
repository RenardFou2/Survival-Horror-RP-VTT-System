const {api, sheets} = foundry.applications;
/**
 * Extend the basic ActorSheet with some very simple modifications
 * @extends {ActorSheetV2}
 */
export class SHRPActorSheet extends api.HandlebarsApplicationMixin(sheets.ActorSheetV2)  {
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
  
  async _prepareContext(options) {
    const context = await super._prepareContext(options);
    context.actor = this.actor;
    context.system = this.actor.system;
    return context;
  }
}   