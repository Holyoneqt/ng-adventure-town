import { Adventures } from '../models/adventures/adventures.enum';
import { Adventure } from '../models/adventures/adventure.model';

export const AdventureCollection: Adventure[] = [
    new Adventure(Adventures.TestAdventure, 'for testing. only monster with level 1', 1, 1),
    new Adventure(Adventures.Plains, 'An open Field with loads of Enemies.', 1, 5),
    new Adventure(Adventures.Forest, 'A thick Forest. Very dangerous.', 4, 10),
    new Adventure(Adventures.Cave, 'A dark and scary Cave.', 10, 18),
    new Adventure(Adventures.Castle, 'Home to the Emperor in the past, now there are only Monsters inside.', 20, 30),
];
