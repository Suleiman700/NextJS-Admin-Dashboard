import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';

export default function DashboardPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Dashboard</CardTitle>
        <CardDescription>Manage your products and view their sales performance.</CardDescription>
      </CardHeader>
      <CardContent></CardContent>
    </Card>
  );
}
