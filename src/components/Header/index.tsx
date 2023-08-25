import { useStore } from '@nanostores/react'
import React from 'react'
import styled from 'styled-components'
import { getPaletteLink, setColor, setPalette } from 'store/palette'
import { Button, ControlGroup } from '../inputs'
import { ThemeButton } from './ThemeButton'
import { PaletteSelect } from './PaletteSelect'
import { CopyButton } from '../CopyButton'
import { Link } from 'shared/icons/Link'
import { GitHub } from 'shared/icons/GitHub'
import { Figma } from 'shared/icons/Figma'
import { Jotform } from 'shared/icons/Jotform'
import { paletteStore } from 'store/palette'
import {
  overlayStore,
  setOverlayMode,
  setVersusColor,
  TOverlayMode,
} from 'store/overlay'
import { ColorEditor } from './ColorEditor'
import { ColorActions } from './ColorActions'
import { selectedStore } from 'store/currentPosition'
import { ChartSettings } from './ChartSettings'

const modes: TOverlayMode[] = ['APCA', 'WCAG', 'NONE', 'DELTA_E']

const texts = {
  APCA: 'APCA Contrast',
  WCAG: 'WCAG Contrast',
  NONE: 'Without Overlay',
  DELTA_E: 'Delta E Distance',
}

export function Header() {
  const palette = useStore(paletteStore)
  const overlay = useStore(overlayStore)
  const selected = useStore(selectedStore)

  return (
    <Wrapper>
     
     <ControlRow>
        <Button as="a" href="./">
          <Jotform/>
        </Button>
        <PaletteSelect />
        <ControlGroup>
          <Button
            onClick={() => {
              // Cycle through modes
              const idx = modes.findIndex(mode => overlay.mode === mode) + 1
              setOverlayMode(modes[idx % modes.length])
            }}
          >
            {texts[overlay.mode]}
          </Button>
          {overlay.mode !== 'NONE' && (
            <Button
              onClick={() =>
                setVersusColor(
                  overlay.versus === 'selected' ? 'white' : 'selected'
                )
              }
            >
              vs. {overlay.versus}
            </Button>
          )}
        </ControlGroup>
      </ControlRow>

      <ControlRow>
        
        
      </ControlRow>
      <ControlRow>
      <ThemeButton />
        <Button as="a" target="_blank" href="https://github.com/ouzozcn/jds-colorcontrasttool">
          <GitHub />
        </Button>
        <Button as="a" target="_blank" href="https://www.figma.com/files/1157226469980826439/team/1161922917534132058">
          <Figma/>
        </Button>
      </ControlRow>
    </Wrapper>
  )
}

const Wrapper = styled.header`
  width: auto;
  display: flex;
  padding: 16px;
  border-bottom: 1px solid var(--c-divider);
  justify-content: space-between;
  align-items: center;
`
const ControlRow = styled.main`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`
