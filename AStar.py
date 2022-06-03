##############################################################################

# import packages

##############################################################################
import json


import numpy as np

import heapq

import matplotlib.pyplot as plt

from matplotlib.pyplot import figure


##############################################################################

##############################################################################

# heuristic function for path scoring

##############################################################################


def heuristic(a, b):

    return np.sqrt((b[0] - a[0]) ** 2 + (b[1] - a[1]) ** 2)


##############################################################################

# path finding function

##############################################################################


def astar(array, start, goal):
    array = np.array(array)

    # neighbors = [(0,1),(0,-1),(1,0),(-1,0),(1,1),(1,-1),(-1,1),(-1,-1)]
    neighbors = [(0, 1), (0, -1), (1, 0), (-1, 0)]

    close_set = set()

    came_from = {}

    gscore = {start: 0}

    fscore = {start: heuristic(start, goal)}

    oheap = []

    heapq.heappush(oheap, (fscore[start], start))

    while oheap:

        current = heapq.heappop(oheap)[1]

        if current == goal:

            data = []

            while current in came_from:

                data.append(current)

                current = came_from[current]

            return data

        close_set.add(current)

        for i, j in neighbors:

            neighbor = current[0] + i, current[1] + j

            tentative_g_score = gscore[current] + heuristic(current, neighbor)

            if 0 <= neighbor[0] < array.shape[0]:

                if 0 <= neighbor[1] < array.shape[1]:

                    if array[neighbor[0]][neighbor[1]] == 2:

                        continue

                else:

                    # array bound y walls

                    continue

            else:

                # array bound x walls

                continue

            if neighbor in close_set and tentative_g_score >= gscore.get(neighbor, 0):

                continue

            if tentative_g_score < gscore.get(neighbor, 0) or neighbor not in [i[1]for i in oheap]:

                came_from[neighbor] = current

                gscore[neighbor] = tentative_g_score

                fscore[neighbor] = tentative_g_score + \
                    heuristic(neighbor, goal)

                heapq.heappush(oheap, (fscore[neighbor], neighbor))

    return []

def startGame(game,start,goal):

    route = astar(game, start, goal)
    if(len(route)!=0):
        route = route + [start]
    route = route[::-1]
    return (list(route))


##############################################################################




