using MediatR;
using Microsoft.Extensions.Caching.Distributed;
using Newtonsoft.Json;
using System.Text;
using UserManagement.Core.Entities;
using UserManagement.Core.Repositories.Query;

namespace UserManagement.Application.Queries.Customers;

// Customer query with List<Customer> response
public record GetAllCustomerQuery : IRequest<List<Customer>>
{

}

public class GetAllCustomerHandler : IRequestHandler<GetAllCustomerQuery, List<Customer>>
{
    private readonly ICustomerQueryRepository _customerQueryRepository;
    private IDistributedCache _distributedCache;
    private static readonly SemaphoreSlim semaphore = new SemaphoreSlim(1, 1);
    public GetAllCustomerHandler(ICustomerQueryRepository customerQueryRepository, IDistributedCache distributedCache)
    {
        _customerQueryRepository = customerQueryRepository;
        _distributedCache = distributedCache;
    }
    public async Task<List<Customer>> Handle(GetAllCustomerQuery request, CancellationToken cancellationToken)
    {
        var cacheKey = "CustomerData";
        string SerializedCustomerList;
        var CustomersList = new List<Customer>();
        var redisCustomersList = await _distributedCache.GetAsync(cacheKey, cancellationToken);


        try
        {
            await semaphore.WaitAsync();
            if (redisCustomersList != null)
            {
                SerializedCustomerList = Encoding.UTF8.GetString(redisCustomersList);
                CustomersList = JsonConvert.DeserializeObject<List<Customer>>(SerializedCustomerList);
            }
            else
            {
                CustomersList = (List<Customer>)await _customerQueryRepository.GetAllAsync(cancellationToken);
                SerializedCustomerList = JsonConvert.SerializeObject(CustomersList);
                var tommorow = DateTime.Now.Date.AddDays(1);
                var totalSeconds = tommorow.Subtract(DateTime.Now).TotalSeconds;
                var distributedCacheEntryOption = new DistributedCacheEntryOptions()
                    .SetAbsoluteExpiration(TimeSpan.FromSeconds(totalSeconds))
                    .SetSlidingExpiration(TimeSpan.FromSeconds(30));
                await _distributedCache.SetStringAsync(cacheKey, SerializedCustomerList, distributedCacheEntryOption, cancellationToken);
            }
        }
        catch (Exception ex)
        {

            throw ex;
        }
        finally
        {
            semaphore.Release();//makesure that we release the semaphore so that other thread can continue.
        }
        return CustomersList;
    }
}
