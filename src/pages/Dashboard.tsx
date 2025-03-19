
import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '@/components/AuthProvider';
import { AnimatedTransition, StaggeredContainer, StaggeredItem } from '@/components/AnimatedTransition';
import { Logo } from '@/components/Logo';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  ClipboardCheck, LogOut, Upload, Clock, CheckCircle2, BanknoteIcon,
  CircleDollarSign, Bell, Search, Settings, UserCircle, ChevronDown
} from 'lucide-react';

const Dashboard = () => {
  const { user, isLoading, signOut } = useAuth();
  
  // If not logged in, redirect to login
  if (!user && !isLoading) {
    return <Navigate to="/login" replace />;
  }
  
  // Show loading state while checking auth
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse flex flex-col items-center">
          <div className="rounded-lg bg-secondary h-12 w-12 mb-4"></div>
          <div className="h-4 bg-secondary rounded w-24"></div>
        </div>
      </div>
    );
  }

  return (
    <AnimatedTransition>
      <div className="min-h-screen bg-background flex flex-col">
        {/* Header */}
        <header className="border-b border-border/40 bg-card/80 backdrop-blur-sm sticky top-0 z-30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 items-center justify-between">
              <div className="flex items-center">
                <Logo size="sm" />
              </div>
              
              <div className="flex items-center gap-2 md:gap-4">
                <Button variant="outline" size="sm" className="hidden md:flex gap-2">
                  <Search className="h-4 w-4" />
                  <span>Search</span>
                  <kbd className="pointer-events-none ml-auto inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
                    <span className="text-xs">⌘</span>K
                  </kbd>
                </Button>
                
                <Button size="icon" variant="ghost" className="relative">
                  <Bell className="h-5 w-5" />
                  <span className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center">
                    <span className="absolute inline-flex h-2 w-2 rounded-full bg-destructive"></span>
                  </span>
                </Button>
                
                <Separator orientation="vertical" className="h-8" />
                
                <div className="flex items-center gap-2">
                  <Avatar className="h-8 w-8 transition-all duration-300 hover:ring-2 hover:ring-primary/20">
                    <AvatarImage src="" alt={user?.full_name || 'User'} />
                    <AvatarFallback>{user?.full_name?.charAt(0) || 'U'}</AvatarFallback>
                  </Avatar>
                  
                  <div className="hidden md:flex flex-col">
                    <span className="text-sm font-medium leading-none">{user?.full_name || 'User'}</span>
                    <span className="text-xs text-muted-foreground leading-none mt-1">
                      {user?.role || 'Manager'}
                    </span>
                  </div>
                  
                  <ChevronDown className="h-4 w-4 text-muted-foreground" />
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Main content */}
        <main className="flex-1 py-8">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
              <div>
                <motion.h1 
                  className="text-3xl font-bold tracking-tight"
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  Dashboard
                </motion.h1>
                <motion.p 
                  className="text-muted-foreground mt-1"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.1, duration: 0.3 }}
                >
                  Welcome back, {user?.full_name?.split(' ')[0] || 'Manager'}
                </motion.p>
              </div>
              
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => signOut()}>
                  <LogOut className="h-4 w-4 mr-2" />
                  Sign out
                </Button>
                <Button>
                  <Upload className="h-4 w-4 mr-2" />
                  New Invoice
                </Button>
              </div>
            </div>

            {/* Stats Cards */}
            <StaggeredContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              <StaggeredItem>
                <Card className="overflow-hidden">
                  <CardHeader className="pb-2">
                    <CardDescription>Pending Approval</CardDescription>
                    <CardTitle className="text-2xl">12</CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                    <div className="h-1 bg-amber-500/20">
                      <div className="h-full w-2/3 bg-amber-500"></div>
                    </div>
                  </CardContent>
                </Card>
              </StaggeredItem>
              
              <StaggeredItem>
                <Card className="overflow-hidden">
                  <CardHeader className="pb-2">
                    <CardDescription>Approved</CardDescription>
                    <CardTitle className="text-2xl">28</CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                    <div className="h-1 bg-green-500/20">
                      <div className="h-full w-3/4 bg-green-500"></div>
                    </div>
                  </CardContent>
                </Card>
              </StaggeredItem>
              
              <StaggeredItem>
                <Card className="overflow-hidden">
                  <CardHeader className="pb-2">
                    <CardDescription>Paid This Month</CardDescription>
                    <CardTitle className="text-2xl">$14,500</CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                    <div className="h-1 bg-blue-500/20">
                      <div className="h-full w-1/2 bg-blue-500"></div>
                    </div>
                  </CardContent>
                </Card>
              </StaggeredItem>
              
              <StaggeredItem>
                <Card className="overflow-hidden">
                  <CardHeader className="pb-2">
                    <CardDescription>Total Freelancers</CardDescription>
                    <CardTitle className="text-2xl">24</CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                    <div className="h-1 bg-purple-500/20">
                      <div className="h-full w-4/5 bg-purple-500"></div>
                    </div>
                  </CardContent>
                </Card>
              </StaggeredItem>
            </StaggeredContainer>
            
            {/* Recent Invoices */}
            <AnimatedTransition className="mb-8">
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle>Recent Invoices</CardTitle>
                    <Button variant="outline" size="sm">View All</Button>
                  </div>
                  <CardDescription>
                    You have 12 invoices waiting for approval
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <motion.div 
                        key={i}
                        className="flex items-center justify-between p-3 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors cursor-pointer"
                        whileHover={{ y: -2, transition: { duration: 0.2 } }}
                      >
                        <div className="flex items-center gap-4">
                          <Avatar>
                            <AvatarFallback>{`F${i}`}</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">Invoice #{1000 + i}</div>
                            <div className="text-sm text-muted-foreground">Freelancer {i}</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="text-right">
                            <div className="font-medium">${(i * 500).toLocaleString()}</div>
                            <div className="text-sm text-muted-foreground">
                              {new Date(2023, 5, i).toLocaleDateString()}
                            </div>
                          </div>
                          {i % 3 === 0 ? (
                            <Badge variant="outline" className="gap-1 text-yellow-600 border-yellow-200 bg-yellow-50">
                              <Clock className="h-3 w-3" /> Pending
                            </Badge>
                          ) : i % 3 === 1 ? (
                            <Badge variant="outline" className="gap-1 text-green-600 border-green-200 bg-green-50">
                              <CheckCircle2 className="h-3 w-3" /> Approved
                            </Badge>
                          ) : (
                            <Badge variant="outline" className="gap-1 text-blue-600 border-blue-200 bg-blue-50">
                              <BanknoteIcon className="h-3 w-3" /> Paid
                            </Badge>
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </AnimatedTransition>
          </div>
        </main>
      </div>
    </AnimatedTransition>
  );
};

export default Dashboard;
