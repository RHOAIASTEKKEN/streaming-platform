"use client"

import { useState } from "react"
import {
  Search,
  TrendingUp,
  Heart,
  ArrowUpRight,
  Filter,
  User,
  Video,
  Gamepad2,
  Music,
  Mic,
  Film,
  ChevronLeft,
  ChevronRight,
  Menu,
} from "lucide-react"
import StreamView from "@/components/stream-view"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Settings, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function StreamingPlatform() {
  const [activeTab, setActiveTab] = useState("following")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [sidebarVisible, setSidebarVisible] = useState(true)
  const [selectedStreamer, setSelectedStreamer] = useState<any>(null)

  const categories = [
    { id: "all", name: "All", icon: <Filter className="w-4 h-4" /> },
    { id: "gaming", name: "Gaming", icon: <Gamepad2 className="w-4 h-4" /> },
    { id: "music", name: "Music", icon: <Music className="w-4 h-4" /> },
    { id: "talk", name: "Talk Shows", icon: <Mic className="w-4 h-4" /> },
    { id: "irl", name: "IRL", icon: <User className="w-4 h-4" /> },
    { id: "creative", name: "Creative", icon: <Film className="w-4 h-4" /> },
  ]

  const followedStreamers = [
    {
      id: 1,
      name: "GameMaster64",
      category: "gaming",
      viewers: 12500,
      thumbnail: "/placeholder.svg?height=180&width=320",
      isLive: true,
    },
    {
      id: 2,
      name: "MusicVibes",
      category: "music",
      viewers: 8700,
      thumbnail: "/placeholder.svg?height=180&width=320",
      isLive: true,
    },
    {
      id: 3,
      name: "TechTalks",
      category: "talk",
      viewers: 5300,
      thumbnail: "/placeholder.svg?height=180&width=320",
      isLive: false,
    },
    {
      id: 4,
      name: "ArtistPro",
      category: "creative",
      viewers: 3200,
      thumbnail: "/placeholder.svg?height=180&width=320",
      isLive: true,
    },
  ]

  const trendingStreamers = [
    {
      id: 5,
      name: "SpeedRunner",
      category: "gaming",
      viewers: 45000,
      thumbnail: "/placeholder.svg?height=180&width=320",
      isLive: true,
    },
    {
      id: 6,
      name: "CookingWithAlex",
      category: "irl",
      viewers: 32000,
      thumbnail: "/placeholder.svg?height=180&width=320",
      isLive: true,
    },
    {
      id: 7,
      name: "CodeGenius",
      category: "talk",
      viewers: 28500,
      thumbnail: "/placeholder.svg?height=180&width=320",
      isLive: true,
    },
    {
      id: 8,
      name: "BeatProducer",
      category: "music",
      viewers: 22000,
      thumbnail: "/placeholder.svg?height=180&width=320",
      isLive: true,
    },
  ]

  const recommendedStreamers = [
    {
      id: 9,
      name: "AdventureTime",
      category: "irl",
      viewers: 15700,
      thumbnail: "/placeholder.svg?height=180&width=320",
      isLive: true,
    },
    {
      id: 10,
      name: "StrategyMaster",
      category: "gaming",
      viewers: 18200,
      thumbnail: "/placeholder.svg?height=180&width=320",
      isLive: true,
    },
    {
      id: 11,
      name: "DigitalArtist",
      category: "creative",
      viewers: 7500,
      thumbnail: "/placeholder.svg?height=180&width=320",
      isLive: true,
    },
    {
      id: 12,
      name: "ScienceLab",
      category: "talk",
      viewers: 12300,
      thumbnail: "/placeholder.svg?height=180&width=320",
      isLive: true,
    },
  ]

  const getFilteredStreamers = () => {
    let streamers = []

    if (activeTab === "following") {
      streamers = followedStreamers
    } else if (activeTab === "trending") {
      streamers = trendingStreamers
    } else if (activeTab === "recommended") {
      streamers = recommendedStreamers
    }

    if (selectedCategory !== "all") {
      return streamers.filter((streamer) => streamer.category === selectedCategory)
    }

    return streamers
  }

  const filteredStreamers = getFilteredStreamers()

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible)
  }

  const handleStreamerClick = (streamer: any) => {
    setSelectedStreamer(streamer)
  }

  const handleBackToList = () => {
    setSelectedStreamer(null)
  }

  // If a streamer is selected, show the stream view
  if (selectedStreamer) {
    return <StreamView streamer={selectedStreamer} onBack={handleBackToList} />
  }

  // Otherwise show the browsing interface
  return (
    <div className="flex flex-col min-h-screen bg-slate-900 text-slate-200">
      {/* Header */}
      <header className="flex items-center justify-between p-4 bg-slate-800 border-b border-slate-700">
        <div className="flex items-center">
          <button className="mr-2 md:hidden text-slate-400 hover:text-white" onClick={toggleSidebar}>
            <Menu className="w-6 h-6" />
          </button>
          <Video className="w-6 h-6 text-blue-500" />
          <span className="ml-2 text-xl font-bold">StreamPro</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative w-64">
            <input
              type="text"
              placeholder="Search streamers..."
              className="w-full px-4 py-2 pl-10 bg-slate-700 rounded-lg text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full bg-slate-700 hover:bg-slate-600 text-slate-200"
              >
                <User className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>Mi cuenta</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                <span>Perfil</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Video className="mr-2 h-4 w-4" />
                <span>Transmisión</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                <span>Configuración</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Cerrar sesión</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex flex-1 overflow-hidden relative">
        {/* Sidebar */}
        <div
          className={`${
            sidebarVisible ? "translate-x-0 w-64" : "-translate-x-full w-0 overflow-hidden"
          } absolute md:relative z-10 transition-all duration-300 ease-in-out h-full bg-slate-800 border-r border-slate-700`}
        >
          <div className={`${sidebarVisible ? "opacity-100" : "opacity-0"} transition-opacity duration-300 h-full`}>
            <div className="flex items-center justify-between p-4">
              <h2 className="text-lg font-semibold">Categories</h2>
            </div>

            <ul className="space-y-2 p-2">
              {categories.map((category) => (
                <li key={category.id}>
                  <button
                    onClick={() => {
                      setSelectedCategory(category.id)
                      if (window.innerWidth < 768) setSidebarVisible(false)
                    }}
                    className={`flex items-center w-full p-2 rounded-lg transition ${
                      selectedCategory === category.id ? "bg-blue-600 text-white" : "text-slate-400 hover:bg-slate-700"
                    }`}
                  >
                    <span className="mr-2">{category.icon}</span>
                    <span>{category.name}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Toggle button that moves with the sidebar */}
          <button
            className="absolute right-0 top-4 z-20 bg-blue-600 text-white p-2 rounded-r-lg shadow-lg transform translate-x-full transition-transform hover:bg-blue-500"
            onClick={toggleSidebar}
            aria-label={sidebarVisible ? "Hide Categories" : "Show Categories"}
          >
            {sidebarVisible ? <ChevronLeft className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
          </button>
        </div>

        {/* Overlay for mobile */}
        {sidebarVisible && (
          <div className="fixed inset-0 bg-slate-900 bg-opacity-50 z-0 md:hidden" onClick={toggleSidebar}></div>
        )}

        {/* Content Area - Now with dynamic margin/padding based on sidebar state */}
        <div
          className={`flex-1 overflow-y-auto transition-all duration-300 ${sidebarVisible ? "md:ml-0" : "ml-0"} p-6`}
          style={{ width: "100%" }}
        >
          <div className={`flex items-center space-x-4 mb-6 ${sidebarVisible ? "ml-8" : "ml-0"}`}>
            <button
              onClick={() => setActiveTab("following")}
              className={`px-4 py-2 flex items-center rounded-lg ${
                activeTab === "following" ? "bg-blue-600 text-white" : "bg-slate-700 text-slate-300 hover:bg-slate-600"
              }`}
            >
              <Heart className="w-4 h-4 mr-2" />
              Following
            </button>
            <button
              onClick={() => setActiveTab("trending")}
              className={`px-4 py-2 flex items-center rounded-lg ${
                activeTab === "trending" ? "bg-blue-600 text-white" : "bg-slate-700 text-slate-300 hover:bg-slate-600"
              }`}
            >
              <TrendingUp className="w-4 h-4 mr-2" />
              Trending
            </button>
            <button
              onClick={() => setActiveTab("recommended")}
              className={`px-4 py-2 flex items-center rounded-lg ${
                activeTab === "recommended"
                  ? "bg-blue-600 text-white"
                  : "bg-slate-700 text-slate-300 hover:bg-slate-600"
              }`}
            >
              <ArrowUpRight className="w-4 h-4 mr-2" />
              Recommended
            </button>
          </div>

          <h2 className={`text-xl font-bold mb-4 ${sidebarVisible ? "ml-8" : "ml-0"}`}>
            {activeTab === "following" && "Streamers You Follow"}
            {activeTab === "trending" && "Trending Now"}
            {activeTab === "recommended" && "Recommended For You"}
            {selectedCategory !== "all" && ` - ${categories.find((c) => c.id === selectedCategory)?.name}`}
          </h2>

          {filteredStreamers.length === 0 ? (
            <div className="p-8 text-center text-slate-400">No streamers found for the selected category.</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredStreamers.map((streamer) => (
                <div
                  key={streamer.id}
                  className="bg-slate-800 rounded-lg overflow-hidden hover:ring-2 hover:ring-blue-500 transition cursor-pointer"
                  onClick={() => handleStreamerClick(streamer)}
                >
                  <div className="relative">
                    <img
                      src={streamer.thumbnail || "/placeholder.svg"}
                      alt={streamer.name}
                      className="w-full h-48 object-cover"
                    />
                    {streamer.isLive && (
                      <span className="absolute top-2 left-2 px-2 py-1 text-xs font-semibold bg-pink-500 text-white rounded">
                        LIVE
                      </span>
                    )}
                    <span className="absolute bottom-2 left-2 px-2 py-1 text-xs font-semibold bg-slate-900 bg-opacity-70 text-white rounded">
                      {streamer.viewers.toLocaleString()} viewers
                    </span>
                  </div>
                  <div className="p-4">
                    <div className="flex justify-between items-center">
                      <h3 className="font-medium text-white">{streamer.name}</h3>
                      <span className="text-xs px-2 py-1 bg-slate-700 rounded-full text-slate-300">
                        {categories.find((c) => c.id === streamer.category)?.name}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  )
}

