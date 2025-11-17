import { useState, useMemo } from "react"
import { Copy, Check, ArrowUpDown, X, Filter, Zap, DollarSign, ChevronDown } from "lucide-react"
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import type {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
} from "@tanstack/react-table"
import { Button } from "../components/ui/button"
import { Card } from "../components/ui/card"
import { Checkbox } from "../components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu"
import { Input } from "../components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "../components/ui/table"
import { useAuth } from "../contexts/AuthContext"

interface Model {
  id: string
  quantization: string
  context_length: number
  max_completion_tokens: number
  pricing: {
    prompt: number
    completion: number
  }
  speed: number
}

const models: Model[] = [
  {
    id: "kimi-k2-thinking",
    quantization: "fp4",
    context_length: 262144,
    max_completion_tokens: 262144,
    pricing: { prompt: 0.55, completion: 2.20 },
    speed: 247
  },
  {
    id: "kimi-k2-thinking-turbo",
    quantization: "fp4",
    context_length: 262144,
    max_completion_tokens: 262144,
    pricing: { prompt: 1.00, completion: 3.00 },
    speed: 41
  },
  {
    id: "kimi-k2-0905",
    quantization: "fp8",
    context_length: 131072,
    max_completion_tokens: 131072,
    pricing: { prompt: 0.15, completion: 0.55 },
    speed: 33
  },
  {
    id: "kimi-k2-0905-turbo",
    quantization: "fp8",
    context_length: 131072,
    max_completion_tokens: 8192,
    pricing: { prompt: 0.35, completion: 1.00 },
    speed: 951
  },
  {
    id: "glm-4.6-turbo",
    quantization: "fp8",
    context_length: 202752,
    max_completion_tokens: 202752,
    pricing: { prompt: 0.50, completion: 2.25 },
    speed: 26
  },
  {
    id: "minimax-m2",
    quantization: "fp8",
    context_length: 196608,
    max_completion_tokens: 196608,
    pricing: { prompt: 0.00, completion: 0.00 },
    speed: 96
  },
  {
    id: "deepseek-v3.1:free",
    quantization: "fp8",
    context_length: 128000,
    max_completion_tokens: 128000,
    pricing: { prompt: 0.00, completion: 0.00 },
    speed: 49
  },
  {
    id: "qwen3-coder:free",
    quantization: "fp8",
    context_length: 256000,
    max_completion_tokens: 256000,
    pricing: { prompt: 0.00, completion: 0.00 },
    speed: 125
  },
  {
    id: "kimi-k2-eco",
    quantization: "fp4",
    context_length: 131072,
    max_completion_tokens: 131072,
    pricing: { prompt: 0.05, completion: 0.10 },
    speed: 16
  },
  {
    id: "glm-4.6",
    quantization: "fp8",
    context_length: 131072,
    max_completion_tokens: 131072,
    pricing: { prompt: 0.30, completion: 0.60 },
    speed: 129
  },
  {
    id: "glm-4.5",
    quantization: "fp8",
    context_length: 131072,
    max_completion_tokens: 131072,
    pricing: { prompt: 0.20, completion: 0.40 },
    speed: 165
  },
  {
    id: "ring-1t",
    quantization: "fp4",
    context_length: 131072,
    max_completion_tokens: 131072,
    pricing: { prompt: 0.40, completion: 1.00 },
    speed: 112
  },
  {
    id: "deepseek-v3.2-exp",
    quantization: "fp4",
    context_length: 131072,
    max_completion_tokens: 131072,
    pricing: { prompt: 0.15, completion: 0.30 },
    speed: 164
  },
  {
    id: "deepseek-v3.1-terminus",
    quantization: "fp4",
    context_length: 131072,
    max_completion_tokens: 131072,
    pricing: { prompt: 0.20, completion: 0.50 },
    speed: 26
  },
  {
    id: "deepseek-v3.1-terminus-reasoner",
    quantization: "fp4",
    context_length: 131072,
    max_completion_tokens: 131072,
    pricing: { prompt: 0.20, completion: 0.50 },
    speed: 45
  },
  {
    id: "deepseek-v3.1",
    quantization: "fp4",
    context_length: 131072,
    max_completion_tokens: 131072,
    pricing: { prompt: 0.15, completion: 0.50 },
    speed: 8
  },
  {
    id: "deepseek-v3.1-reasoner",
    quantization: "fp4",
    context_length: 131072,
    max_completion_tokens: 131072,
    pricing: { prompt: 0.15, completion: 0.50 },
    speed: 88
  },
  {
    id: "deepseek-v3-0324",
    quantization: "fp4",
    context_length: 131072,
    max_completion_tokens: 8192,
    pricing: { prompt: 0.20, completion: 0.25 },
    speed: 33
  },
  {
    id: "deepseek-v3-0324-turbo",
    quantization: "fp4",
    context_length: 131072,
    max_completion_tokens: 8192,
    pricing: { prompt: 0.50, completion: 1.00 },
    speed: 91
  },
  {
    id: "deepseek-r1-0528",
    quantization: "fp4",
    context_length: 131072,
    max_completion_tokens: 131072,
    pricing: { prompt: 0.25, completion: 0.25 },
    speed: 35
  },
  {
    id: "deepseek-r1-0528-turbo",
    quantization: "fp4",
    context_length: 131072,
    max_completion_tokens: 131072,
    pricing: { prompt: 1.00, completion: 2.00 },
    speed: 125
  },
  {
    id: "qwen3-next-80b-a3b-instruct",
    quantization: "fp8",
    context_length: 262144,
    max_completion_tokens: 262144,
    pricing: { prompt: 0.08, completion: 0.38 },
    speed: 24
  },
  {
    id: "qwen3-235b-a22b-2507-instruct",
    quantization: "fp8",
    context_length: 131072,
    max_completion_tokens: 131072,
    pricing: { prompt: 0.10, completion: 0.25 },
    speed: 96
  },
  {
    id: "qwen3-235b-a22b-2507-thinking",
    quantization: "fp8",
    context_length: 131072,
    max_completion_tokens: 131072,
    pricing: { prompt: 0.10, completion: 0.30 },
    speed: 48
  },
  {
    id: "qwen3-coder",
    quantization: "fp8",
    context_length: 131072,
    max_completion_tokens: 131072,
    pricing: { prompt: 0.15, completion: 0.35 },
    speed: 71
  },
  {
    id: "qwen3-coder-turbo",
    quantization: "fp8",
    context_length: 131072,
    max_completion_tokens: 131072,
    pricing: { prompt: 0.20, completion: 0.50 },
    speed: 254
  },
  {
    id: "gpt-oss-120b",
    quantization: "fp4",
    context_length: 131072,
    max_completion_tokens: 131072,
    pricing: { prompt: 0.07, completion: 0.27 },
    speed: 148
  },
  {
    id: "gpt-oss-safeguard-120b",
    quantization: "fp8",
    context_length: 131072,
    max_completion_tokens: 131072,
    pricing: { prompt: 0.07, completion: 0.27 },
    speed: 135
  },
  {
    id: "gemma-3-27b-it",
    quantization: "fp8",
    context_length: 131072,
    max_completion_tokens: 131072,
    pricing: { prompt: 0.04, completion: 0.10 },
    speed: 81
  },
  {
    id: "llama-4-scout",
    quantization: "fp8",
    context_length: 262144,
    max_completion_tokens: 16384,
    pricing: { prompt: 0.08, completion: 0.40 },
    speed: 65
  },
  {
    id: "llama3.3-70b",
    quantization: "fp8",
    context_length: 131072,
    max_completion_tokens: 8192,
    pricing: { prompt: 0.12, completion: 0.20 },
    speed: 31
  },
  {
    id: "deepseek-r1-distill-llama-70b",
    quantization: "fp4",
    context_length: 65536,
    max_completion_tokens: 65536,
    pricing: { prompt: 0.10, completion: 0.10 },
    speed: 64
  },
  {
    id: "deepseek-r1-distill-qwen-32b",
    quantization: "fp4",
    context_length: 65536,
    max_completion_tokens: 65536,
    pricing: { prompt: 0.10, completion: 0.10 },
    speed: 65
  },
  {
    id: "stok-0.4.1",
    quantization: "stok",
    context_length: 2048,
    max_completion_tokens: 2048,
    pricing: { prompt: 0.00, completion: 0.00 },
    speed: 4140
  }
]

export function PricingPage() {
  const { isLoggedIn } = useAuth()
  const [copiedModel, setCopiedModel] = useState<string | null>(null)
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null)
  const [showModal, setShowModal] = useState(false)
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = useState({})
  const [providerFilter, setProviderFilter] = useState<string>("")
   const [sortMode, setSortMode] = useState<'default' | 'model-asc' | 'model-desc' | 'speed-fastest' | 'speed-slowest' | 'price-cheapest' | 'price-expensive'>('default')

  const copyModelId = async (modelId: string) => {
    try {
      await navigator.clipboard.writeText(modelId)
      setCopiedModel(modelId)
      setTimeout(() => setCopiedModel(null), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  const showPlanModal = (plan: string) => {
    setSelectedPlan(plan)
    setShowModal(true)
  }

  const confirmPlanChange = () => {
    if (selectedPlan) {
      window.location.href = `/plan-api/${selectedPlan}`
    }
  }

  const getSpeedColor = (speed: number) => {
    if (speed > 99) return "text-green-500"
    if (speed > 30) return "text-yellow-500"
    return "text-red-500"
  }

  const formatNumber = (num: number) => {
    return num.toLocaleString()
  }

  const getProviderName = (modelId: string) => {
    const provider = modelId.split('-')[0]
    if (!provider) return modelId

    // Special case: normalize llama variations to "Llama"
    if (provider.toLowerCase().startsWith('llama')) {
      return 'Llama'
    }

    // Special cases that should not be capitalized
    if (provider.toLowerCase().startsWith('glm') ||
        provider.toLowerCase().startsWith('gpt') ||
        provider.toLowerCase().startsWith('qwen')) {
      return provider.toUpperCase().replace(/\d+$/, '') // Remove trailing numbers
    }
    // Capitalize first letter for others
    return provider.charAt(0).toUpperCase() + provider.slice(1)
  }

  const uniqueProviders = useMemo(() => {
    const providers = models.map(model => getProviderName(model.id))
    return [...new Set(providers)].sort()
  }, [models])

  const columns: ColumnDef<Model>[] = [
    {
      accessorKey: "id",
      header: () => <div className="font-bold">Model</div>,
      cell: ({ row }) => {
        const model = row.original
        return (
          <div className="flex flex-col gap-1">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-sm">{model.id}</span>
                            {(model.id.includes('free') || (model.pricing.prompt === 0 && model.pricing.completion === 0)) && (
                              <span className="px-1.5 py-0.5 text-xs font-medium bg-green-500/20 text-green-400 rounded">Free</span>
                            )}
                            {model.id.includes('turbo') && (
                              <span className="px-1.5 py-0.5 text-xs font-medium bg-blue-500/20 text-blue-400 rounded">Turbo</span>
                            )}
              <Button
                variant="ghost"
                size="sm"
                className="h-6 w-6 p-0 flex-shrink-0"
                onClick={() => copyModelId(model.id)}
              >
                {copiedModel === model.id ? (
                  <Check className="h-3 w-3" />
                ) : (
                  <Copy className="h-3 w-3" />
                )}
              </Button>
            </div>
            <div className="text-xs text-muted-foreground">
              <div className="md:hidden">
                <span className="font-medium">Quant:</span> {model.quantization} •
                <span className="font-medium"> Context:</span> {formatNumber(model.context_length)} / {formatNumber(model.max_completion_tokens)}
              </div>
              <div className="hidden md:block">
                {model.quantization} • {formatNumber(model.context_length)} / {formatNumber(model.max_completion_tokens)}
              </div>
            </div>
          </div>
        )
      },
    },
    {
      accessorKey: "pricing.prompt",
      header: () => <div className="text-center font-bold">$ / M in</div>,
    cell: ({ row }) => {
      const amount = row.original.pricing.prompt
      return <div className="text-center text-sm font-bold">${amount.toFixed(2)}</div>
    },
    },
    {
      accessorKey: "pricing.completion",
      header: () => <div className="text-center font-bold">$ / M out</div>,
    cell: ({ row }) => {
      const amount = row.original.pricing.completion
      return <div className="text-center text-sm font-bold">${amount.toFixed(2)}</div>
    },
    },
    {
      accessorKey: "speed",
      header: () => <div className="text-center font-bold">Speed</div>,
      cell: ({ row }) => {
        const speed = row.original.speed
        return (
          <div className={`text-center text-sm ${getSpeedColor(speed)}`}>
            ~{speed} t/s
          </div>
        )
      },
    },
  ]

  const filteredModels = useMemo(() => {
    let filtered
    if (!providerFilter) {
      filtered = models
    } else if (providerFilter === "Free") {
      filtered = models.filter(model => model.pricing.prompt === 0 && model.pricing.completion === 0)
    } else if (providerFilter === "Best Speed") {
      filtered = models.filter(model => model.speed > 99)
    } else {
      filtered = models.filter(model => getProviderName(model.id) === providerFilter)
    }

    // Apply sorting based on sort mode
    if (sortMode === 'model-asc') {
      filtered = [...filtered].sort((a, b) => a.id.localeCompare(b.id))
    } else if (sortMode === 'model-desc') {
      filtered = [...filtered].sort((a, b) => b.id.localeCompare(a.id))
    } else if (sortMode === 'speed-fastest') {
      filtered = [...filtered].sort((a, b) => b.speed - a.speed)
    } else if (sortMode === 'speed-slowest') {
      filtered = [...filtered].sort((a, b) => a.speed - b.speed)
     } else if (sortMode === 'price-cheapest') {
       filtered = [...filtered].sort((a, b) => {
         if (a.pricing.completion !== b.pricing.completion) {
           return a.pricing.completion - b.pricing.completion
         }
         return a.pricing.prompt - b.pricing.prompt
       })
     } else if (sortMode === 'price-expensive') {
       filtered = [...filtered].sort((a, b) => {
         if (a.pricing.completion !== b.pricing.completion) {
           return b.pricing.completion - a.pricing.completion
         }
         return b.pricing.prompt - a.pricing.prompt
       })
    }
    // 'default' keeps original order

    return filtered
  }, [models, providerFilter, sortMode])

  const table = useReactTable({
    data: filteredModels,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  })

  return (
    <div className="px-8 pt-9 pb-0 h-full">
      <div className="w-full rounded-md h-[calc(100vh-8.5rem)] flex flex-col overflow-hidden relative">
        <div className="flex flex-col h-full">
          <div className="flex-1 overflow-y-auto px-16 py-12 max-w-6xl mx-auto">
        {/* Plans Section */}
        <div className="mb-12">
          <h1 className="text-3xl font-bold mb-4 gradient-text text-center">Pricing</h1>
          <p className="text-muted-foreground text-center mb-8">Choose the plan that works for you</p>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 max-w-6xl mx-auto">
            {/* Free Plan */}
            <Card className="p-4 flex flex-col bg-neutral-950">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="text-xl font-semibold">Free/Pay-as-you-go</h3>
                  <p className="text-3xl font-bold mt-1">$0<span className="text-lg font-normal text-muted-foreground">/month</span></p>
                </div>
              </div>
              <ul className="space-y-2 mb-2 flex-grow">
                <li className="flex items-center">• Pay only for usage</li>
                <li className="flex items-center">• No recurring monthly charge</li>
              </ul>
              <Button
                className="w-full !hover:bg-purple-500/10 !transition-colors"
                onClick={() => window.location.href = '/signup'}
              >
                Get Started
              </Button>
            </Card>

            {/* Hobby Plan */}
            <Card className="p-4 border-primary flex flex-col bg-neutral-950">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="text-xl font-semibold gradient-text">Hobby</h3>
                  <p className="text-3xl font-bold mt-1">$5<span className="text-lg font-normal text-muted-foreground">/month</span></p>
                </div>
              </div>
              <ul className="space-y-2 mb-2 flex-grow">
                <li className="flex items-center">• 250 daily requests</li>
                <li className="flex items-center">• Access to all models</li>
              </ul>
              {isLoggedIn ? (
                <Button
                  className="w-full !hover:bg-purple-500/10 !transition-colors"
                  variant="outline"
                  onClick={() => showPlanModal('hobby')}
                >
                  Purchase Hobby Plan
                </Button>
              ) : (
                <Button
                  className="w-full !hover:bg-purple-500/10 !transition-colors"
                  onClick={() => window.location.href = '/signup'}
                >
                  Get Started
                </Button>
              )}
            </Card>

            {/* Pro Plan */}
            <Card className="p-4 border-primary flex flex-col bg-neutral-950">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="text-xl font-semibold gradient-text">Pro</h3>
                  <p className="text-3xl font-bold mt-1">$10<span className="text-lg font-normal text-muted-foreground">/month</span></p>
                </div>
              </div>
              <ul className="space-y-2 mb-2 flex-grow">
                <li className="flex items-center">• All Hobby benefits</li>
                <li className="flex items-center">• 1,000 daily requests</li>
                <li className="flex items-center">• Priority Support</li>
              </ul>
              {isLoggedIn ? (
                <Button
                  className="w-full !hover:bg-purple-500/10 !transition-colors"
                  variant="outline"
                  onClick={() => showPlanModal('pro')}
                >
                  Purchase Pro Plan
                </Button>
              ) : (
                <Button
                  className="w-full !hover:bg-purple-500/10 !transition-colors"
                  onClick={() => window.location.href = '/signup'}
                >
                  Get Started
                </Button>
              )}
            </Card>
          </div>
        </div>

        {/* Models Pricing Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-center">Large Language Model (LLM) Pricing</h2>

          <div className="w-full">
            <div className="flex items-center justify-between py-4">
               <div className="flex items-center gap-4">
                 <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                     <Button variant="outline" className="hover:bg-accent text-foreground">
                       {providerFilter || "All Models"}
                        <ChevronDown className="ml-px h-4 w-4" />
                     </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start" className="bg-neutral-950 text-white border-neutral-900">
                    <DropdownMenuCheckboxItem
                      checked={!providerFilter}
                      onCheckedChange={(checked) => setProviderFilter(checked ? "" : providerFilter)}
                    >
                      All Models
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem
                      checked={providerFilter === "Free"}
                      onCheckedChange={(checked) => setProviderFilter(checked ? "Free" : "")}
                    >
                      Free
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem
                      checked={providerFilter === "Best Speed"}
                      onCheckedChange={(checked) => setProviderFilter(checked ? "Best Speed" : "")}
                    >
                      Best Speed
                    </DropdownMenuCheckboxItem>
                    {uniqueProviders.map((provider) => (
                      <DropdownMenuCheckboxItem
                        key={provider}
                        checked={providerFilter === provider}
                        onCheckedChange={(checked) => setProviderFilter(checked ? provider : "")}
                      >
                        {provider}
                      </DropdownMenuCheckboxItem>
                     ))}
                   </DropdownMenuContent>
                 </DropdownMenu>
                  <div className="relative max-w-full md:max-w-md mr-8">
                   <Input
                     placeholder="Filter models..."
                     value={(table.getColumn("id")?.getFilterValue() as string) ?? ""}
                     onChange={(event) =>
                       table.getColumn("id")?.setFilterValue(event.target.value)
                     }
                     className="pr-7"
                   />
                   <Button
                     variant="ghost"
                     className={`absolute right-2 top-1/2 -translate-y-1/2 !p-0 !w-6 !h-6 bg-transparent hover:bg-purple-500/10 hover:text-white transition-all duration-200 ${
                       (table.getColumn("id")?.getFilterValue() as string) ? 'opacity-100' : 'opacity-0'
                     }`}
                     onClick={() => table.getColumn("id")?.setFilterValue("")}
                   >
                     <X className="h-4 w-4" />
                   </Button>
                 </div>
               </div>
               <div className="flex items-center gap-4">
                 <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                     <Button variant="outline" className="hover:bg-accent text-foreground">
                       {(sortMode === 'speed-fastest' || sortMode === 'speed-slowest') ? (
                         <Zap className="mr-0.5 h-4 w-4" />
                       ) : (sortMode === 'price-cheapest' || sortMode === 'price-expensive') ? (
                         <DollarSign className="mr-0.5 h-4 w-4" />
                       ) : (
                         <ArrowUpDown className="mr-0.5 h-4 w-4" />
                       )}
                       {sortMode === 'default' ? 'Default' :
                        sortMode === 'model-asc' ? 'A-Z' :
                        sortMode === 'model-desc' ? 'Z-A' :
                        sortMode === 'speed-fastest' ? 'Fastest' :
                        sortMode === 'speed-slowest' ? 'Slowest' :
                        sortMode === 'price-cheapest' ? 'Cheapest' :
                        sortMode === 'price-expensive' ? 'Premium' : 'Sort'}
                     </Button>
                  </DropdownMenuTrigger>
                   <DropdownMenuContent align="end" className="bg-neutral-950 text-white border-neutral-900">
                     <DropdownMenuCheckboxItem
                       checked={sortMode === 'default'}
                       onCheckedChange={() => setSortMode('default')}
                     >
                       Default
                     </DropdownMenuCheckboxItem>
                     <DropdownMenuCheckboxItem
                       checked={sortMode === 'model-asc'}
                       onCheckedChange={() => setSortMode('model-asc')}
                     >
                       A-Z
                     </DropdownMenuCheckboxItem>
                     <DropdownMenuCheckboxItem
                       checked={sortMode === 'model-desc'}
                       onCheckedChange={() => setSortMode('model-desc')}
                     >
                       Z-A
                     </DropdownMenuCheckboxItem>
                     <DropdownMenuCheckboxItem
                       checked={sortMode === 'speed-fastest'}
                       onCheckedChange={() => setSortMode('speed-fastest')}
                     >
                       Fastest
                     </DropdownMenuCheckboxItem>
                     <DropdownMenuCheckboxItem
                       checked={sortMode === 'speed-slowest'}
                       onCheckedChange={() => setSortMode('speed-slowest')}
                     >
                       Slowest
                     </DropdownMenuCheckboxItem>
                     <DropdownMenuCheckboxItem
                       checked={sortMode === 'price-cheapest'}
                       onCheckedChange={() => setSortMode('price-cheapest')}
                     >
                       Cheapest
                     </DropdownMenuCheckboxItem>
                     <DropdownMenuCheckboxItem
                       checked={sortMode === 'price-expensive'}
                       onCheckedChange={() => setSortMode('price-expensive')}
                     >
                       Premium
                     </DropdownMenuCheckboxItem>
                   </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
            <div className="rounded-md border min-h-[500px] pb-32">
              <Table>
                <TableHeader>
                  {table.getHeaderGroups().map((headerGroup) => (
                    <TableRow key={headerGroup.id}>
                      {headerGroup.headers.map((header) => {
                        return (
                          <TableHead key={header.id}>
                            {header.isPlaceholder
                              ? null
                              : flexRender(
                                  header.column.columnDef.header,
                                  header.getContext()
                                )}
                          </TableHead>
                        )
                      })}
                    </TableRow>
                  ))}
                </TableHeader>
                <TableBody>
                  {table.getRowModel().rows?.length ? (
                    table.getRowModel().rows.map((row) => (
                      <TableRow
                        key={row.id}
                        data-state={row.getIsSelected() && "selected"}
                      >
                        {row.getVisibleCells().map((cell) => (
                          <TableCell key={cell.id}>
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext()
                            )}
                          </TableCell>
                        ))}
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell
                        colSpan={columns.length}
                        className="h-24 text-center"
                      >
                        No results.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </div>
        </div>
          </div>

        </div>

        <div className="absolute inset-0 rounded-md animate-gradient-glow pointer-events-none"></div>

      </div>

      {/* Confirmation Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <Card className="p-6 max-w-md w-full mx-4">
            <h2 className="text-xl font-semibold mb-4">Confirm Plan Change</h2>
            <p className="text-muted-foreground mb-6">
              {selectedPlan === "free"
                ? "This will immediately remove all privileges of your current plan. Are you sure you want to do this?"
                : `The ${selectedPlan?.charAt(0).toUpperCase()}${selectedPlan?.slice(1)} plan subscription fee of $${selectedPlan === "hobby" ? "5" : "10"}/month will be deducted from your account credits. Are you sure you want to proceed with this plan change?`
              }
            </p>
            <div className="flex gap-3 justify-end">
              <Button variant="outline" onClick={() => setShowModal(false)}>
                Cancel
              </Button>
              <Button onClick={confirmPlanChange}>
                Yes, please
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  )
}

export default PricingPage