import React from 'react'

// Mock SVG component for Jest tests
const SvgMock = React.forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement>>((props, ref) => (
  <svg ref={ref} {...props} data-testid="svg-mock" />
))

SvgMock.displayName = 'SvgMock'

export default SvgMock
