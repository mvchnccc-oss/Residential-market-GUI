"use client";

import { useApp } from '@/contexts/AppContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

function StatCard({ title, value, description }: { title: string; value: string; description: string }) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
}

export default function Dashboard() {
  const { properties, representatives, clients, tours, agreements } = useApp();

  
  const totalProperties = properties.length;
  const availableProperties = properties.filter(p => p.status === 'Available').length;
  const soldProperties = properties.filter(p => p.status === 'Sold').length;

  const totalTours = tours.length;
  const recentTours = tours.filter(t => {
    const tourDate = new Date(t.date);
    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
    return tourDate >= oneMonthAgo;
  }).length;

  const propertiesWithoutTours = properties.filter(p =>
    !tours.some(t => t.propertyId === p.id)
  ).length;

  const clientsWithoutTours = clients.filter(c =>
    !tours.some(t => t.clientId === c.id)
  ).length;

  const styleCounts = properties.reduce((acc, p) => {
    acc[p.type] = (acc[p.type] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  const mostRequestedStyle = Object.entries(styleCounts).sort(([,a], [,b]) => b - a)[0]?.[0] || 'N/A';

  // Top representative by total deal value
  const repDeals = representatives.map(rep => {
    const repAgreements = agreements.filter(a => a.representativeId === rep.id);
    const totalValue = repAgreements.reduce((sum, a) => sum + a.price, 0);
    return { ...rep, totalValue };
  });
  const topRep = repDeals.sort((a, b) => b.totalValue - a.totalValue)[0];

  // Units per representative
  const unitsPerRep = representatives.map(rep => ({
    name: rep.name,
    units: properties.filter(p => p.representativeId === rep.id).length,
  }));

  // Total tours per client
  const toursPerClient = clients.map(client => ({
    name: client.name,
    tours: tours.filter(t => t.clientId === client.id).length,
  }));

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground">Overview of your residential marketplace</p>
      </div>

    
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
        <StatCard
          title="Total Properties"
          value={totalProperties.toString()}
          description={`${availableProperties} available, ${soldProperties} sold`}
        />
        <StatCard
          title="Active Tours"
          value={totalTours.toString()}
          description={`${recentTours} in last month`}
        />
        <StatCard
          title="Total Clients"
          value={clients.length.toString()}
          description={`${clientsWithoutTours} without tours`}
        />
        <StatCard
          title="Completed Agreements"
          value={agreements.length.toString()}
          description="Successful deals"
        />
      </div>

      {/* Analytics Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Most Requested Property Style</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{mostRequestedStyle}</div>
            <p className="text-sm text-muted-foreground">
              Based on property listings
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Properties Without Tours</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">{propertiesWithoutTours}</div>
            <p className="text-sm text-muted-foreground">
              Last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Top Representative</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {topRep ? `EGP ${(topRep.totalValue / 1000000).toFixed(1)}M` : 'N/A'}
            </div>
            <p className="text-sm text-muted-foreground">
              {topRep?.name || 'No deals yet'}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Units per Representative</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {unitsPerRep.map((rep) => (
                <div key={rep.name} className="flex justify-between text-sm">
                  <span>{rep.name}</span>
                  <span className="font-medium">{rep.units} units</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Tours per Client</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {toursPerClient.map((client) => (
                <div key={client.name} className="flex justify-between text-sm">
                  <span>{client.name}</span>
                  <span className="font-medium">{client.tours} tours</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Clients Without Tours</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{clientsWithoutTours}</div>
            <p className="text-sm text-muted-foreground">
              Need attention
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}