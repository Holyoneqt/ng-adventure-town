import { ItemType } from '../models/items/item-type.enum';
import { Item } from '../models/items/item.model';

export const JunkItemCollection: Item[] = [
    new Item(10001, 'Used Bandage', '', 1, ItemType.Crafting),
    new Item(10002, 'Broken Sword', '', 4, ItemType.Junk),
    new Item(10003, 'Glas Shards', '', 2, ItemType.Junk),
    new Item(10004, 'Torn off Cloth', '', 2, ItemType.Junk),
    new Item(10005, 'Weird looking "Egg"', '', 10, ItemType.Junk),
    new Item(10006, 'Broken Stem', '', 1, ItemType.Junk),
    new Item(10007, 'Old Book', '', 6, ItemType.Junk),
    new Item(10008, 'Small Key', 'It\'s broken.', 3, ItemType.Junk),
    new Item(10009, 'Common Quartz Crystal', '', 6, ItemType.Junk),
    new Item(10010, 'Small Feather', '', 1, ItemType.Junk),
    new Item(10011, 'Broken Claw', '', 1, ItemType.Junk),
    new Item(10012, 'Small Tusk', '', 2, ItemType.Junk),
    new Item(10013, 'Unreadable Letter', '', 1, ItemType.Junk),
    new Item(10014, 'Bag of Marbles', '', 3, ItemType.Junk),
];

export const GemItemCollection: Item[] = [
    new Item(20001, 'Diamond', 'A white Gemstone', 80, ItemType.Gem),
    new Item(20002, 'Cobalt', 'A blue Gemstone', 30, ItemType.Gem),
    new Item(20003, 'Emerald', 'A green Gemstone', 30, ItemType.Gem),
    new Item(20004, 'Topaz', 'A orange Gemstone', 30, ItemType.Gem),
    new Item(20005, 'Rose', 'A pink Gemstone', 30, ItemType.Gem),
    new Item(20007, 'Ruby', 'A red Gemstone', 30, ItemType.Gem),
    new Item(20008, 'Lilac', 'A purple Gemstone', 30, ItemType.Gem),
];

export const CraftingItemCollection: Item[] = [
    new Item(30001, 'Iron Ore', 'Used to craft Weapons and Armor', 5, ItemType.Crafting),
];
