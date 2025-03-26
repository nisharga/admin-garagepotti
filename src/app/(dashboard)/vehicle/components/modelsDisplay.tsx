import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface Model {
  model: string
  years: string[]
}

interface ModelsDisplayProps {
  models: Model[]
}

export default function ModelsDisplay({ models }: ModelsDisplayProps) {
  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Available Models</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {models.map((model, index) => (
          <Card key={index} className="overflow-hidden">
            <CardHeader className="bg-secondary/20 pb-2">
              <CardTitle>{model.model}</CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="flex flex-wrap gap-2">
                {model.years.map((year, yearIndex) => (
                  <div
                    key={yearIndex}
                    className="flex items-center bg-secondary text-secondary-foreground px-2 py-1 rounded-md text-sm"
                  >
                    {year}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

