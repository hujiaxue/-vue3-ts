import registerElement from './register-element'
import registerProperties from './register-properties'

import { App } from 'vue'

export function globalRegister(app: App): void {
  registerElement(app)
  registerProperties(app)
}
