/**
 * @license
 * Copyright 2016 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

import * as createFocusTrap from 'focus-trap';

type focusTrap = (
  element: HTMLElement | string,
  userOptions?: createFocusTrap.Options
) => createFocusTrap.FocusTrap;

function createFocusTrapInstance(
  surfaceEl: HTMLElement,
  focusTrapFactory: focusTrap = createFocusTrap as unknown as focusTrap,
  initialFocusEl: createFocusTrap.FocusTarget | null,
): createFocusTrap.FocusTrap {
  return focusTrapFactory(surfaceEl, ({
    initialFocus: initialFocusEl,
    escapeDeactivates: false, // Dialog foundation handles escape key
    clickOutsideDeactivates: true, // Allow handling of scrim clicks
  } as createFocusTrap.Options));
}

function isScrollable(el: HTMLElement): boolean {
  return el.scrollHeight > el.offsetHeight;
}

function areTopsMisaligned(els: HTMLElement[]): boolean {
  const tops = new Set();
  [].forEach.call(els, (el: HTMLElement) => tops.add(el.offsetTop));
  return tops.size > 1;
}

export {focusTrap, createFocusTrapInstance, isScrollable, areTopsMisaligned};