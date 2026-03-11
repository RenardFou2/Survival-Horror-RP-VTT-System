import SHRPActorSheet from './ActorSheet.js';

export default class HumanSheet extends SHRPActorSheet {
    /** @inheritdoc */
    static DEFAULT_OPTIONS = {
        classes: ["hero"],  
        position: {
            height: 600,
        },
    };

    /** @inheritdoc */
    static PARTS = {
        header: {
        template: systemPath("templates/actor/header.hbs")
        },
        tabs: {
        template: "templates/generic/tab-navigation.hbs"
        },
        properties: {
        template: systemPath("templates/shared/properties.hbs"),
        scrollable: [""]
        },
        items: {
        template: systemPath("templates/actor/items.hbs"),
        scrollable: [""]
        },
        effects: {
        template: systemPath("templates/shared/effects.hbs"),
        scrollable: [""]
        }
    };
}