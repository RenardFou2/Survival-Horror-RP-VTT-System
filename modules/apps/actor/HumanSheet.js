import { SHRPActorSheet } from './ActorSheet.js';

export class HumanSheet extends SHRPActorSheet {
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
            scrollable: true
        }
    }

    static PARTS = {
        wholeSheetForNow: {
            template: "./systems/survival-horror-rp/templates/actor/humanSheet/humanSheet.hbs",
            scrollable: [""]
        }
    }

    async _prepareContext(options) {
        const context = await super._prepareContext(options);
        context.actor = this.actor;
        context.system = this.actor.system;
        return context;
    }
}