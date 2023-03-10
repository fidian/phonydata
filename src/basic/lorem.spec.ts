import test from 'ava';
import { testGeneric } from '../test-util';

testGeneric(
    test,
    'loremSentence',
    [],
    [
        'Quia velit a consequatur et voluptatum culpa.',
        'Distinctio fuga eum quae.',
    ]
);
testGeneric(
    test,
    'loremSentenceFragment',
    [],
    ['voluptatum quia velit a consequatur', 'voluptatum culpa ea aut']
);
testGeneric(
    test,
    'loremTitle',
    [],
    ['Voluptatum Quia Velit A Consequatur', 'Voluptatum Culpa Ea Aut']
);
testGeneric(
    test,
    'loremTitleWords',
    [[3], [2]],
    ['Illo Voluptatum Quia', 'Velit A']
);
testGeneric(test, 'loremWord', [], ['illo', 'voluptatum']);
testGeneric(
    test,
    'loremWords',
    [[3], [2]],
    ['illo voluptatum quia', 'velit a']
);
