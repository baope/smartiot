import Vue from 'vue';
import Router from 'vue-router';
import Crowdsensing from '@/view/Crowdsensing';
import CrowdPath from '@/view/CrowdPath';
import Trajectory from '@/view/Trajectory';
import Index from "@/view/index";
import Intro from "@/view/GroupIntro";
import Overview from '@/view/Overview'
import Protocol from "@/view/Protocol";
import EdgeComp from "@/view/EdgeComp";
import Balance from "@/view/OverLoad";
import Positioning from '@/view/Positioning'
import Networktopology from '@/view/Networktopology'
import Optimazation from "@/view/Optimazation";
import Tsn from '@/view/Tsn'

import Networktopology2 from '@/view/Networktopology2'
import Networktopology3 from '@/view/Networktopology3'


import Adhocnet from '@/view/Adhocnet'
import Blockchain from '@/view/Blockchain'
import TopoGraph from '@/view/TopoGraph'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      // name: 'Index',
      // component: Index
      redirect: '/intro'
    },
    {
      path: '/intro',
      name: "GroupIntro",
      component: Intro,
    },
    {
      path: '/overview',
      name: 'Overview',
      component: Overview
    },
    {
      path: '/protocol',
      name: 'Protocol',
      component: Protocol
    },
    {
      path: '/positioning',
      name: 'Positioning',
      component: Positioning
    },
    {
      path: '/crowdsensing',
      name: 'Crowdsensing',
      component: Crowdsensing
    },
    {
      path: '/crowdpath',
      name: 'Crowdpath',
      component: CrowdPath
    },
    {
      path: '/trajectory',
      name: 'Trajectory',
      component: Trajectory
    },
    {
      path: '/edgecomputing',
      name: "EdgeComp",
      component: EdgeComp
    },
    {
      path: '/Networktopology',
      name: "Networktopology",
      component: Networktopology
    },
    {
      path: '/Networktopology2',
      name: "Networktopology2",
      component: Networktopology2
    },
    {
      path: '/Networktopology3',
      name: "Networktopology3",
      component: Networktopology3
    },
    {
      path: '/Adhocnet',
      name: "Adhocnet",
      component: Adhocnet
    },
    {
      path: '/edge/balance',
      name: "Balance",
      component: Balance
    },
    {
      path: '/blockchain',
      name: "Blockchain",
      component: Blockchain
    },
    {
      path: '/topograph',
      name: "TopoGraph",
      component: TopoGraph
    },

    {
      path: '/tsn',
      name: "Tsn",
      component: Tsn
    },
    {
      path: "/optimazation",
      name: "Optimazation",
      component: Optimazation,
    },

    {
      path: '/blockchain/overview',
      name: "Overview",
      component: () => import('@/view/blockchain/arrange/Overview'),
    }, ,
    {
      path: '/blockchain/performance',
      name: 'Performance',
      component: () => import('@/view/blockchain/arrange/Performance'),

    },
    {
      path: '/blockchain/Nodetest',
      name: 'Nodetest',
      component: () => import('@/view/blockchain/arrange/Nodetest'),
    },
    {
      path: '/simulation-pow',
      name: 'Pow',
      component: () => import('@/view/blockchain/simulation/PoW'),
    },

    {
      path: '/sharding/sharding',
      name: 'FullPic',
      component: () => import('@/view/blockchain/sharding/FullPic'),

    },
    {
      path: '/sharding/overlap',
      name: 'OverlapSharding',
      component: () => import('@/view/blockchain/sharding/OverlapSharding'),

    },
    {
      path: '/sharding/analysis',
      name: 'Analysis',
      component: () => import('@/view/blockchain/sharding/Analysis'),

    },
    {
      path: '/simulation-setting',
      name: 'Setting',
      component: () => import('@/view/blockchain/simulation/Setting'),
    },
    {
      path: '/addNodes',
      name: 'AddNodes',
      component: () => import('@/view/blockchain/simulation/AddNodes'),
    },
    {
      path: '/NodesTopology',
      name: 'NodesTopology',
      component: () => import('@/view/blockchain/simulation/NodesTopology'),

    }, {
      path: '/achievement/model1',
      name: 'Model1',
      component: () => import('@/view/blockchain/achievement/Model1'),

    },
    {
      path: '/achievement/model2',
      name: 'Model2',
      component: () => import('@/view/blockchain/achievement/Model2'),

    },
    {
      path: '/achievement/model3',
      name: 'Model3',
      component: () => import('@/view/blockchain/achievement/Model3'),

    },
    {
      path: '/achievement/model4',
      name: 'Model4',
      component: () => import('@/view/blockchain/achievement/Model4'),

    },
  ]
})
