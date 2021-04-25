import { createContext, ReactNode, useContext, useState } from 'react'

type Episode = {
    title: string;
    members: string
    thumbnail: string
    duration: number
    url: string
}

type PlayerContextData = {
    episodeList: Episode[]
    currentEpisodeIndex: number
    isPlaying: boolean
    isLooping: boolean
    isShuffling: boolean
    play: (episode: Episode) => void
    PlayList: (list: Episode[], index: number) => void
    setPlayingState: (state: boolean) => void
    togglePlay: () => void
    toggleLoop: () => void
    toggleShuffle: () => void
    clearPlayerState: () => void
    playNext: () => void
    playPrevious: () => void
    hasNext: boolean
    hasPrevious: boolean
}

export const PlayerContext = createContext({} as PlayerContextData)

type PlayerContextProviderProps = {
    children: ReactNode
}

export function PlayerContextProvider({ children }: PlayerContextProviderProps) {
    const [episodeList, setEpisodeList] = useState([])
    const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState(0)
    const [isPlaying, setIsPlaying] = useState(false)
    const [isLooping, setIsLooping] = useState(false)
    const [isShuffling, setIsShuffling] = useState(false)

    function play(episode: Episode) {
        setEpisodeList([episode])
        setCurrentEpisodeIndex(0)
        setIsPlaying(true)
    }

    function PlayList(list: Episode[], index: number) {
        setEpisodeList(list)
        setCurrentEpisodeIndex(index)
        setIsPlaying(true)
    }

    function togglePlay() {
        setIsPlaying(!isPlaying)
    }

    function toggleLoop() {
        setIsLooping(!isLooping)
    }

    function toggleShuffle() {
        setIsShuffling(!isShuffling)
    }

    function setPlayingState(state: boolean) {
        setIsPlaying(state)
    }

    function clearPlayerState() {
        setEpisodeList([])
        setCurrentEpisodeIndex(0)
    }

    const hasPrevious = currentEpisodeIndex > 0
    const hasNext = isShuffling || (currentEpisodeIndex + 1) < episodeList.length

    function playNext() {

        if(isShuffling) {
            const nextRandomEpisodeIndex = Math.floor(Math.random() * episodeList.length)
            setCurrentEpisodeIndex(nextRandomEpisodeIndex)
        }else if (hasNext){
            setCurrentEpisodeIndex(currentEpisodeIndex + 1)
        }
        
    }

    function playPrevious() {
        if(hasPrevious){
            setCurrentEpisodeIndex(currentEpisodeIndex - 1)
        }
    }

    return (
        <PlayerContext.Provider 
        value={{ episodeList, currentEpisodeIndex, 
        play, 
        PlayList,
        playNext,
        playPrevious,
        isPlaying, 
        isLooping,
        isShuffling,
        togglePlay, 
        toggleLoop,
        toggleShuffle,
        clearPlayerState,
        setPlayingState, 
        hasNext,
        hasPrevious
        }}>
            {children}
        </PlayerContext.Provider>
    )
}

export const usePlayer = () => {
    return useContext(PlayerContext)
}