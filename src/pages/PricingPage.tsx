import { Copy, Check } from "lucide-react"
import { useState, useMemo } from "react"
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

  return (
    <div className="px-8 pt-9 pb-0 h-full">
      <div className="container mx-auto max-w-6xl">
        {/* Plans Section */}
        <div className="mb-12">
          <h1 className="text-3xl font-bold mb-4 gradient-text text-center">Pricing</h1>
          <p className="text-muted-foreground text-center mb-8">Choose the plan that works for you</p>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {/* Free Plan */}
            <Card className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-semibold">Free/Pay-as-you-go</h3>
                  <p className="text-3xl font-bold mt-2">$0<span className="text-lg font-normal text-muted-foreground">/month</span></p>
                </div>
              </div>
              <ul className="space-y-2 mb-6">
                <li className="flex items-center">• Pay only for usage</li>
                <li className="flex items-center">• No recurring monthly charge</li>
              </ul>
            </Card>

            {/* Hobby Plan */}
            <Card className="p-6 border-primary">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-semibold">Hobby</h3>
                  <p className="text-3xl font-bold mt-2">$5<span className="text-lg font-normal text-muted-foreground">/month</span></p>
                </div>
              </div>
              <ul className="space-y-2 mb-6">
                <li className="flex items-center">• 250 daily requests</li>
                <li className="flex items-center">• Access to all models</li>
              </ul>
              {isLoggedIn && (
                <Button
                  className="w-full"
                  variant="outline"
                  onClick={() => showPlanModal('hobby')}
                >
                  Purchase Hobby Plan
                </Button>
              )}
            </Card>

            {/* Pro Plan */}
            <Card className="p-6 border-primary">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-semibold">Pro</h3>
                  <p className="text-3xl font-bold mt-2">$10<span className="text-lg font-normal text-muted-foreground">/month</span></p>
                </div>
              </div>
              <ul className="space-y-2 mb-6">
                <li className="flex items-center">• All Hobby benefits</li>
                <li className="flex items-center">• 1,000 daily requests</li>
                <li className="flex items-center">• Priority Support</li>
              </ul>
              {isLoggedIn && (
                <Button
                  className="w-full"
                  variant="outline"
                  onClick={() => showPlanModal('pro')}
                >
                  Purchase Pro Plan
                </Button>
              )}
            </Card>
          </div>
        </div>

        {/* Models Pricing Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-center">Large Language Model (LLM) Pricing</h2>
          
          <div className="rounded-lg border bg-card overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="min-w-[250px] md:w-[300px]">
                    <div>
                      <div>Model</div>
                      <div className="text-xs text-muted-foreground font-normal mt-1 hidden md:block">
                        Quantization • Context / Max output
                      </div>
                    </div>
                  </TableHead>
                  <TableHead className="text-center min-w-[80px]">$ / M in</TableHead>
                  <TableHead className="text-center min-w-[80px]">$ / M out</TableHead>
                  <TableHead className="text-center min-w-[80px]">Speed</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {models.map((model) => (
                  <TableRow key={model.id}>
                    <TableCell>
                      <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-sm">{model.id}</span>
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
                    </TableCell>
                    <TableCell className="text-center font-mono text-sm">
                      ${model.pricing.prompt.toFixed(2)}
                    </TableCell>
                    <TableCell className="text-center font-mono text-sm">
                      ${model.pricing.completion.toFixed(2)}
                    </TableCell>
                    <TableCell className={`text-center font-mono text-sm ${getSpeedColor(model.speed)}`}>
                      ~{model.speed} t/s
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
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