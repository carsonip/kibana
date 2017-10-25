import { Registry } from '../../common/lib/registry';
import { Fn } from '../functions/fn';

class FunctionsRegistry extends Registry {
  wrapper(obj) {
    return new Fn(obj);
  }
}

export const functionsRegistry = new FunctionsRegistry();
