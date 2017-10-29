import * as React from 'react'

import { computed } from 'mobx'
import { inject, observer } from 'mobx-react'
import styled from 'react-emotion'

import { getAvatarURL, getProfileURL } from 'src/api'
import { CharacterStore } from 'src/character/stores/CharacterStore'
import { parseBBC } from 'src/chat/util/bbc'

const Avatar = styled('img')`
  width: 100px;
  height: 100px;
  display: block;
`

type Props = {
  name: string
  characterStore?: CharacterStore
}

@inject('characterStore')
@observer
export class CharacterDetails extends React.Component<Props> {
  @computed
  get character() {
    return this.props.characterStore!.getCharacter(this.props.name)
  }

  render() {
    const { name } = this.props
    const { status, statusMessage } = this.character

    return (
      <div className="padding">
        <a href={getProfileURL(name)} target="_blank">
          <h2 style={{ margin: 0 }}>{name}</h2>
        </a>

        <div className="spacer" />

        <a href={getProfileURL(name)} target="_blank">
          <Avatar src={getAvatarURL(name)} alt={`Avatar for ${name}`} key={name} />
        </a>

        <div className="spacer" />

        <div className="bg-color-darken-1 padding text-italic text-small">
          <span className={`character-status-${status.toLowerCase()}`}>{status}</span>
          {statusMessage.trim() !== '' && (
            <span dangerouslySetInnerHTML={{ __html: ' - ' + parseBBC(statusMessage) }} />
          )}
        </div>
      </div>
    )
  }
}
