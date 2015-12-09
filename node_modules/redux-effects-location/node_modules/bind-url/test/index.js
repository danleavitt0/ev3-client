/**
 * Imports
 */

import test from 'tape'
import bindUrl from '../src'

/**
 * Tests
 */

test('should work with location on initialization', ({equal, end}) => {
  const wnd = new MockWnd()

  wnd.location = 'testing'
  bindUrl({wnd}, url => equal('testing', url))

  end()
})

test('should work with popstate', ({equal, end}) => {
  const wnd = new MockWnd()
  let shouldEqual = wnd.location = 'other'

  bindUrl({wnd}, url => equal(shouldEqual, url))

  shouldEqual = wnd.location = 'testing'
  wnd.emit('popstate')

  end()
})

/**
 * Mock window object
 */

class MockWnd {
  constructor () {
    this.events = {}
  }

  addEventListener (name, fn) {
    this.events[name] = this.events[name] || []
    this.events[name].push(fn)
  }

  emit (name, e) {
    (this.events[name] || []).forEach(fn => fn(e))
  }

  set location (str) {
    const [pathname, search] = str.split('?')
    this._location = {pathname, search}
    console.log('set location', this._location)
  }

  get location () {
    return this._location
  }
}
