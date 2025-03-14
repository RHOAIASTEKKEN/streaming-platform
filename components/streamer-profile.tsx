"use client"

import { useState } from "react"
import {
  Heart,
  Share2,
  MoreVertical,
  Award,
  Users,
  Gift,
  Check,
  PlusCircle,
  Link,
  Instagram,
  Youtube,
  Twitter,
  Twitch,
  Flag,
  Bell,
  BellOff,
  Volume2,
  VolumeX,
  Copy,
  ExternalLink,
  DollarSign,
  ChevronDown,
  ChevronUp,
  Info,
} from "lucide-react"
import { TiktokIcon } from "./icons/tiktok"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { toast } from "@/components/ui/use-toast"
import { Toaster } from "@/components/ui/toaster"

export default function StreamerProfile({ streamer }: { streamer: any }) {
  const [isFollowing, setIsFollowing] = useState(false)
  const [isNotificationsOn, setIsNotificationsOn] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [activeTab, setActiveTab] = useState("info")
  const [shareDialogOpen, setShareDialogOpen] = useState(false)
  const [subscribeDialogOpen, setSubscribeDialogOpen] = useState(false)
  const [showAllSections, setShowAllSections] = useState(false)
  const [mediaItems] = useState([
    { type: "image", url: "/placeholder.svg?height=300&width=400", title: "Último directo" },
    { type: "url", url: "https://example.com/clip", title: "Mejor momento" },
    { type: "image", url: "/placeholder.svg?height=300&width=400", title: "Highlights" },
    { type: "image", url: "/placeholder.svg?height=300&width=400", title: "Setup Tour" },
  ])

  const socialMedia = [
    {
      name: "Instagram",
      icon: <Instagram size={18} />,
      url: "https://instagram.com/gamemaster64",
      username: "@gamemaster64",
    },
    { name: "YouTube", icon: <Youtube size={18} />, url: "https://youtube.com/gamemaster64", username: "GameMaster64" },
    {
      name: "Twitter",
      icon: <Twitter size={18} />,
      url: "https://twitter.com/gamemaster64",
      username: "@gamemaster64",
    },
    {
      name: "TikTok",
      icon: <TiktokIcon size={18} />,
      url: "https://tiktok.com/@gamemaster64",
      username: "@gamemaster64",
    },
    { name: "Twitch", icon: <Twitch size={18} />, url: "https://twitch.tv/gamemaster64", username: "gamemaster64" },
  ]

  const handleFollow = () => {
    setIsFollowing(!isFollowing)

    if (!isFollowing) {
      toast({
        title: "¡Siguiendo a " + (streamer?.name || "Streamer") + "!",
        description: "Recibirás notificaciones cuando comience a transmitir.",
      })
    } else {
      toast({
        title: "Has dejado de seguir a " + (streamer?.name || "Streamer"),
        description: "Ya no recibirás notificaciones de este canal.",
      })
    }
  }

  const handleToggleNotifications = () => {
    setIsNotificationsOn(!isNotificationsOn)

    if (!isNotificationsOn) {
      toast({
        title: "Notificaciones activadas",
        description: "Recibirás alertas cuando " + (streamer?.name || "Streamer") + " comience a transmitir.",
      })
    } else {
      toast({
        title: "Notificaciones desactivadas",
        description: "Ya no recibirás alertas de este canal.",
      })
    }
  }

  const handleToggleMute = () => {
    setIsMuted(!isMuted)

    if (!isMuted) {
      toast({
        title: "Canal silenciado",
        description: "Has silenciado a " + (streamer?.name || "Streamer") + ".",
      })
    } else {
      toast({
        title: "Canal activado",
        description: "Has activado el sonido para " + (streamer?.name || "Streamer") + ".",
      })
    }
  }

  const handleCopyLink = () => {
    // En una aplicación real, esto copiaría la URL real del canal
    navigator.clipboard.writeText(`https://streampro.com/${streamer?.name || "streamer"}`)

    toast({
      title: "Enlace copiado",
      description: "El enlace del canal ha sido copiado al portapapeles.",
    })

    setShareDialogOpen(false)
  }

  const handleReport = () => {
    toast({
      title: "Reporte enviado",
      description: "Gracias por ayudarnos a mantener la plataforma segura.",
      variant: "destructive",
    })
  }

  const handleSubscribe = (tier: string) => {
    toast({
      title: `¡Suscripción ${tier} completada!`,
      description: `Te has suscrito a ${streamer?.name || "Streamer"} con el plan ${tier}.`,
    })

    setSubscribeDialogOpen(false)
  }

  const toggleAllSections = () => {
    setShowAllSections(!showAllSections)
  }

  return (
    <div className="flex flex-col bg-slate-900 text-slate-200">
      <Toaster />

      {/* Banner y perfil */}
      <div className="relative">
        {/* Info del streamer */}
        <div className="p-4 bg-slate-800 border-b border-slate-700">
          <div className="flex items-start">
            {/* Avatar */}
            <div className="relative mr-4">
              <div className="w-16 h-16 rounded-full bg-slate-700 overflow-hidden">
                <img
                  src="/placeholder.svg?height=64&width=64"
                  alt={streamer?.name || "Streamer"}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -top-1 -right-1 bg-purple-500 rounded-full p-0.5">
                <Check size={12} />
              </div>
            </div>

            {/* Nombre y botones */}
            <div className="flex flex-col flex-grow gap-2">
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <h1 className="text-xl font-bold">{streamer?.name || "Streamer"}</h1>
                    <div className="bg-purple-500 rounded-full p-0.5">
                      <Check size={14} />
                    </div>
                  </div>
                  <div className="text-sm text-slate-400">NOCHE DE HAR HAR HAR 👻 FNAF Realista y lo que surja</div>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs text-slate-400">
                      {streamer?.category ? categories.find((c) => c.id === streamer.category)?.name : "Games"}
                    </span>
                    <span className="px-2 py-0.5 text-xs bg-slate-700 rounded-full">Español</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {/* Share Button */}
                  <Dialog open={shareDialogOpen} onOpenChange={setShareDialogOpen}>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="icon" className="bg-slate-700 hover:bg-slate-600 border-0">
                        <Share2 size={20} />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-md">
                      <DialogHeader>
                        <DialogTitle>Compartir canal</DialogTitle>
                        <DialogDescription>
                          Comparte este canal con tus amigos en redes sociales o copia el enlace directo.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="flex items-center space-x-2 mt-4">
                        <div className="grid flex-1 gap-2">
                          <Input readOnly value={`https://streampro.com/${streamer?.name || "streamer"}`} />
                        </div>
                        <Button onClick={handleCopyLink} className="px-3">
                          <span className="sr-only">Copy</span>
                          <Copy className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="flex justify-center gap-4 mt-4">
                        <Button variant="outline" className="rounded-full p-2 h-auto w-auto">
                          <Twitter className="h-5 w-5 text-[#1DA1F2]" />
                        </Button>
                        <Button variant="outline" className="rounded-full p-2 h-auto w-auto">
                          <Instagram className="h-5 w-5 text-[#E1306C]" />
                        </Button>
                        <Button variant="outline" className="rounded-full p-2 h-auto w-auto">
                          <TiktokIcon className="h-5 w-5" />
                        </Button>
                        <Button variant="outline" className="rounded-full p-2 h-auto w-auto">
                          <ExternalLink className="h-5 w-5" />
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>

                  {/* More Options Button */}
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="icon" className="bg-slate-700 hover:bg-slate-600 border-0">
                        <MoreVertical size={20} />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={handleToggleNotifications}>
                        {isNotificationsOn ? (
                          <>
                            <BellOff className="mr-2 h-4 w-4" />
                            <span>Desactivar notificaciones</span>
                          </>
                        ) : (
                          <>
                            <Bell className="mr-2 h-4 w-4" />
                            <span>Activar notificaciones</span>
                          </>
                        )}
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={handleToggleMute}>
                        {isMuted ? (
                          <>
                            <Volume2 className="mr-2 h-4 w-4" />
                            <span>Activar sonido</span>
                          </>
                        ) : (
                          <>
                            <VolumeX className="mr-2 h-4 w-4" />
                            <span>Silenciar canal</span>
                          </>
                        )}
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={handleCopyLink}>
                        <Copy className="mr-2 h-4 w-4" />
                        <span>Copiar enlace</span>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={handleReport} className="text-red-500">
                        <Flag className="mr-2 h-4 w-4" />
                        <span>Reportar canal</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>

                  {/* Follow Button */}
                  <Button
                    onClick={handleFollow}
                    variant={isFollowing ? "outline" : "default"}
                    className={
                      isFollowing ? "bg-slate-700 hover:bg-slate-600 border-0" : "bg-purple-600 hover:bg-purple-700"
                    }
                  >
                    {isFollowing ? "Siguiendo" : "Seguir"}
                    {!isFollowing && <Heart size={16} className="ml-2" />}
                  </Button>

                  {/* Subscribe Button */}
                  <Dialog open={subscribeDialogOpen} onOpenChange={setSubscribeDialogOpen}>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="icon" className="bg-slate-700 hover:bg-slate-600 border-0">
                        <PlusCircle size={20} />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-md">
                      <DialogHeader>
                        <DialogTitle>Suscribirse a {streamer?.name || "Streamer"}</DialogTitle>
                        <DialogDescription>Elige un plan de suscripción para apoyar a este creador.</DialogDescription>
                      </DialogHeader>
                      <Tabs defaultValue="tier1" className="w-full mt-4">
                        <TabsList className="grid w-full grid-cols-3">
                          <TabsTrigger value="tier1">Tier 1</TabsTrigger>
                          <TabsTrigger value="tier2">Tier 2</TabsTrigger>
                          <TabsTrigger value="tier3">Tier 3</TabsTrigger>
                        </TabsList>
                        <TabsContent value="tier1" className="p-4 border rounded-md mt-2">
                          <div className="flex justify-between items-center mb-4">
                            <div>
                              <h3 className="font-bold text-lg">Suscripción Básica</h3>
                              <p className="text-sm text-slate-400">Acceso a emotes y chat de suscriptores</p>
                            </div>
                            <div className="text-xl font-bold">$4.99</div>
                          </div>
                          <Button onClick={() => handleSubscribe("Básica")} className="w-full">
                            Suscribirse
                          </Button>
                        </TabsContent>
                        <TabsContent value="tier2" className="p-4 border rounded-md mt-2">
                          <div className="flex justify-between items-center mb-4">
                            <div>
                              <h3 className="font-bold text-lg">Suscripción Premium</h3>
                              <p className="text-sm text-slate-400">Emotes exclusivos y badge especial</p>
                            </div>
                            <div className="text-xl font-bold">$9.99</div>
                          </div>
                          <Button onClick={() => handleSubscribe("Premium")} className="w-full">
                            Suscribirse
                          </Button>
                        </TabsContent>
                        <TabsContent value="tier3" className="p-4 border rounded-md mt-2">
                          <div className="flex justify-between items-center mb-4">
                            <div>
                              <h3 className="font-bold text-lg">Suscripción VIP</h3>
                              <p className="text-sm text-slate-400">Todos los beneficios + menciones especiales</p>
                            </div>
                            <div className="text-xl font-bold">$24.99</div>
                          </div>
                          <Button onClick={() => handleSubscribe("VIP")} className="w-full">
                            Suscribirse
                          </Button>
                        </TabsContent>
                      </Tabs>
                      <div className="flex items-center gap-2 mt-4 text-sm text-slate-400">
                        <DollarSign size={16} />
                        <span>El 50% de tu suscripción va directamente al creador</span>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Botón único para mostrar/ocultar todas las secciones */}
      <div className="mx-4 mt-4 mb-2">
        <Button
          onClick={toggleAllSections}
          variant="outline"
          className="w-full flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 border-0 py-3"
        >
          <Info className="h-5 w-5" />
          <span>{showAllSections ? "Ocultar información del canal" : "Mostrar información del canal"}</span>
          {showAllSections ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
        </Button>
      </div>

      {/* Contenedor de todas las secciones */}
      <div
        className={`transition-all duration-500 ease-in-out overflow-hidden ${
          showAllSections ? "max-h-[2000px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        {/* Información del canal */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-4">
          {/* Columna izquierda: Acerca de */}
          <div className="bg-slate-800 rounded-lg p-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold">Acerca de {streamer?.name || "Streamer"}</h2>
              <div className="bg-purple-500 rounded-full p-0.5">
                <Check size={14} />
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2 mb-2">
                <Users size={18} className="text-slate-400" />
                <span className="text-sm font-medium">15.6 M seguidores</span>
                <span className="text-xs bg-yellow-500 text-black px-1 rounded">Vizz</span>
              </div>
              <p className="text-sm text-slate-400 mb-4">se contar hasta patata</p>

              {/* Social Media Links */}
              <div className="space-y-3">
                <h3 className="text-sm font-semibold text-slate-300">Redes Sociales</h3>
                {socialMedia.map((social, index) => (
                  <a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm text-slate-400 hover:text-slate-200 transition-colors"
                  >
                    <div className="text-slate-300">{social.icon}</div>
                    <span>{social.username}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Columna derecha: Metas */}
          <div className="bg-slate-800 rounded-lg p-4 md:col-span-2">
            <h2 className="text-lg font-bold mb-4">Metas de {streamer?.name || "Streamer"}</h2>

            {/* Meta de seguidores */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="bg-slate-700 rounded-lg p-2">
                    <Users size={16} className="text-slate-200" />
                  </div>
                  <div>
                    <div className="text-sm font-medium">¡Faltan 2,151 seguidores más!</div>
                    <div className="text-xs text-slate-400">15637849/15640000 Seguidores</div>
                  </div>
                </div>
                <button className="p-1 rounded bg-slate-700">
                  <Heart size={16} className="text-slate-200" />
                </button>
              </div>
              <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                <div className="h-full bg-yellow-500" style={{ width: "98%" }}></div>
              </div>
              <div className="flex justify-between mt-1">
                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
              </div>
            </div>

            {/* Meta de suscripciones */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="bg-slate-700 rounded-lg p-2">
                    <Gift size={16} className="text-slate-200" />
                  </div>
                  <div>
                    <div className="text-sm font-medium">¡Faltan 263 suscripciones más!</div>
                    <div className="text-xs text-slate-400">13737/14000 Suscripciones</div>
                  </div>
                </div>
                <button className="p-1 rounded bg-slate-700">
                  <Award size={16} className="text-slate-200" />
                </button>
              </div>
              <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                <div className="h-full bg-yellow-500" style={{ width: "95%" }}></div>
              </div>
              <div className="flex justify-between mt-1">
                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Área de contenido personalizable */}
        <div className="bg-slate-800 rounded-lg mx-4 mb-4 overflow-hidden">
          <div className="border-b border-slate-700 flex">
            <button
              className={`px-4 py-3 font-medium text-sm ${activeTab === "info" ? "text-white border-b-2 border-purple-500" : "text-slate-400"}`}
              onClick={() => setActiveTab("info")}
            >
              Información
            </button>
            <button
              className={`px-4 py-3 font-medium text-sm ${activeTab === "media" ? "text-white border-b-2 border-purple-500" : "text-slate-400"}`}
              onClick={() => setActiveTab("media")}
            >
              Media
            </button>
          </div>

          {activeTab === "info" && (
            <div className="p-4">
              <div className="bg-slate-700 rounded-lg p-4">
                <h3 className="font-medium text-lg mb-2">Sobre el canal</h3>
                <p className="text-slate-300 mb-4">
                  ¡Bienvenidos a mi canal! Soy {streamer?.name || "Streamer"}, un apasionado de los videojuegos y la
                  tecnología.
                </p>

                <h3 className="font-medium text-lg mb-2">Horario de streams</h3>
                <ul className="list-disc list-inside text-slate-300 mb-4">
                  <li>Lunes a Viernes: 8:00 PM - 12:00 AM (CET)</li>
                  <li>Sábados: Streams especiales de 6 horas</li>
                  <li>Domingos: Descanso</li>
                </ul>

                <h3 className="font-medium text-lg mb-2">Reglas del chat</h3>
                <ul className="list-disc list-inside text-slate-300">
                  <li>Respeta a todos los miembros de la comunidad</li>
                  <li>No spam ni publicidad</li>
                  <li>No política ni temas controversiales</li>
                  <li>¡Diviértete y disfruta del stream!</li>
                </ul>
              </div>
            </div>
          )}

          {activeTab === "media" && (
            <div className="p-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {mediaItems.map((item, index) => (
                  <div key={index} className="bg-slate-700 rounded-lg overflow-hidden">
                    {item.type === "image" && (
                      <img src={item.url || "/placeholder.svg"} alt={item.title} className="w-full h-48 object-cover" />
                    )}
                    {item.type === "url" && (
                      <div className="h-48 flex items-center justify-center bg-slate-600">
                        <Link size={32} className="text-slate-400" />
                      </div>
                    )}
                    <div className="p-3">
                      <h3 className="font-medium">{item.title}</h3>
                      <div className="text-xs text-slate-400 truncate mt-1">{item.url}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

const categories = [
  { id: "all", name: "All" },
  { id: "gaming", name: "Gaming" },
  { id: "music", name: "Music" },
  { id: "talk", name: "Talk Shows" },
  { id: "irl", name: "IRL" },
  { id: "creative", name: "Creative" },
]

