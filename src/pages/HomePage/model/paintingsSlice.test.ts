import fetchMock from 'jest-fetch-mock'
import reducer, { fetchPaintingsAction, initialState } from './homePageSlice'
import { API_BASE_URL } from '@/src/shared/config/apiConfig'

const mockPaintingItem = {
  id: '1',
  author: 'Vincent van Gogh',
  paintingUrl: 'http://example.com/starry-night.jpg',
  title: 'Starry Night',
  artType: 'Oil on canvas',
  price: 1000000,
  theme: 'Post-Impressionism',
  style: 'Impressionism',
  materials: 'Oil, Canvas',
  height: 73.7,
  width: 92.1,
  yearOfCreation: 1889,
  format: 'Landscape',
  color: 'Blue',
}

describe('paintings reducer', () => {
  it('should handle fetchPaintingsAction.fulfilled', () => {
    const mockPaintings = {
      data: [mockPaintingItem],
      total: 1,
    }

    const action = {
      type: fetchPaintingsAction.fulfilled.type,
      payload: mockPaintings,
    }

    const state = reducer(initialState, action)

    expect(state).toEqual({
      paintings: mockPaintings,
      loading: 'succeeded',
      error: null,
    })
  })

  it('should handle fetchPaintingsAction.fulfilled with empty data array', () => {
    const mockPaintings = {
      data: [],
      total: 0,
    }

    const action = {
      type: fetchPaintingsAction.fulfilled.type,
      payload: mockPaintings,
    }

    const state = reducer(initialState, action)

    expect(state).toEqual({
      paintings: mockPaintings,
      loading: 'succeeded',
      error: null,
    })
  })

  it('should handle fetchPaintingsAction.fulfilled with zero total paintings', () => {
    const mockPaintings = {
      data: [mockPaintingItem],
      total: 0,
    }

    const action = {
      type: fetchPaintingsAction.fulfilled.type,
      payload: mockPaintings,
    }

    const state = reducer(initialState, action)

    expect(state).toEqual({
      paintings: mockPaintings,
      loading: 'succeeded',
      error: null,
    })
  })

  it('should handle fetchPaintingsAction.fulfilled with total paintings greater than 0 but empty data array', () => {
    const mockPaintings = {
      data: [],
      total: 1,
    }

    const action = {
      type: fetchPaintingsAction.fulfilled.type,
      payload: mockPaintings,
    }

    const state = reducer(initialState, action)

    expect(state).toEqual({
      paintings: mockPaintings,
      loading: 'succeeded',
      error: null,
    })
  })

  it('should handle fetchPaintingsAction.pending', () => {
    const action = {
      type: fetchPaintingsAction.pending.type,
    }

    const state = reducer(initialState, action)

    expect(state.loading).toBe('pending')
  })

  it('should handle fetchPaintingsAction.rejected with error', () => {
    const action = {
      type: fetchPaintingsAction.rejected.type,
      error: { message: 'Failed to load data' },
    }

    const state = reducer(initialState, action)

    expect(state).toEqual({
      paintings: { data: [], total: 0 },
      loading: 'failed',
      error: 'Failed to load data',
    })
  })

  it('should return the initial state when state is undefined', () => {
    const action = { type: 'unknown_action' }
    const state = reducer(undefined, action)
    expect(state).toEqual(initialState)
  })
})

fetchMock.enableMocks()

describe('fetchPaintingsAction API call', () => {
  beforeEach(() => {
    fetchMock.resetMocks()
  })

  it('should call the correct API with the correct parameters', async () => {
    const mockResponse = {
      data: [{ id: '1', title: 'Starry Night' }],
      total: 1,
    }
    fetchMock.mockResponseOnce(JSON.stringify(mockResponse))

    const dispatch = jest.fn()
    const thunk = fetchPaintingsAction({ page: 1, limit: 10 })

    await thunk(dispatch, () => ({}), undefined)
    expect(fetchMock).toHaveBeenCalledWith(
      `${API_BASE_URL}/paintings?page=1&limit=10`
    )
  })
})
