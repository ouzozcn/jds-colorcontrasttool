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
  APCA: 'APCA contrast',
  WCAG: 'WCAG contrast',
  NONE: 'Without overlay',
  DELTA_E: 'Delta E distance',
}

export function Header() {
  const palette = useStore(paletteStore)
  const overlay = useStore(overlayStore)
  const selected = useStore(selectedStore)

  return (
    <Wrapper>
     

      <ControlRow>
      <h3>Jotform Design System - Color Palette</h3>
      </ControlRow>

      <ControlRow>
        
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
      <ThemeButton />
        <Button as="a" target="_blank" href="https://github.com/ouzozcn">
          <GitHub />
        </Button>
        <Button as="a" target="_blank" href="https://www.figma.com/file/xQtrZIWRI9AvflqMKQ7wNK/00.-Foundations?type=design&node-id=0-1&mode=design&t=IEhk46a2CdPYtQBo-0">
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
